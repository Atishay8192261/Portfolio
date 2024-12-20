export const fetchGitHubContributions = async () => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const today = new Date();

  const query = JSON.stringify({
    query: `
      query {
        user(login: "Atishay8192261") {
          contributionsCollection(from: "${oneYearAgo.toISOString()}", to: "${today.toISOString()}") {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `,
  });

  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    throw new Error("GitHub token is missing! Add it to your .env.local file.");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: query,
  });

  const data = await response.json();

  if (!response.ok || data.errors) {
    throw new Error(`GitHub API error: ${data.errors?.[0]?.message || response.statusText}`);
  }
  interface Week {
    contributionDays: {
      date: string;
      contributionCount: number;
    }[];
  }

  const allDays = data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
    (week: Week) => week.contributionDays
  );

  return allDays.map((day: { contributionCount: number }) => day.contributionCount);
};
