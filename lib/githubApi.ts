export const fetchGitHubContributions = async () => {
  const query = JSON.stringify({
    query: `
      query {
        user(login: "Atishay8192261") {
          contributionsCollection {
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

  const allDays = data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
    (week: any) => week.contributionDays
  );

  // Filter data to get only the most recent month
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const filteredDays = allDays.filter((day: any) => {
    const date = new Date(day.date);
    return date >= oneMonthAgo;
  });

  return filteredDays.map((day: any) => day.contributionCount);
};
