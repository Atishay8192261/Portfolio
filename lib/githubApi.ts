// lib/githubApi.ts
import fetch from 'cross-fetch';

const GITHUB_API_URL = 'https://api.github.com/graphql';

export const fetchContributions = async (token: string) => {
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
    `
  });

  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: query,
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.user.contributionsCollection.contributionCalendar.weeks;
};
