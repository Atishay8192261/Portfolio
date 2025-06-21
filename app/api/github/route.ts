import { NextResponse } from "next/server"

interface ContributionDay {
  date: string
  contributionCount: number
}

interface Week {
  contributionDays: ContributionDay[]
}

interface ContributionCalendar {
  totalContributions: number
  weeks: Week[]
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar
  totalCommitContributions: number
  restrictedContributionsCount: number
}

interface GitHubUser {
  contributionsCollection: ContributionsCollection
}

interface GitHubResponse {
  data: {
    user: GitHubUser
  }
  errors?: Array<{
    message: string
    locations?: Array<{
      line: number
      column: number
    }>
    path?: string[]
  }>
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 })
    }

    const today = new Date()
    const from = new Date(today)
    from.setFullYear(from.getFullYear() - 1)
    from.setDate(from.getDate() + 1) // GitHub includes start date

    const query = {
      query: `
        query {
          user(login: "Atishay8192261") {
            contributionsCollection(from: "${from.toISOString()}", to: "${today.toISOString()}") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `,
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })

    const data: GitHubResponse = await response.json()

    if (!response.ok || data.errors) {
      console.error("GitHub API error:", data.errors)
      return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
    }

    const collection = data.data.user.contributionsCollection
    const contributionData = collection.contributionCalendar

    const contributions: number[] = []
    contributionData.weeks.forEach((week: Week) => {
      week.contributionDays.forEach((day: ContributionDay) => {
        contributions.push(day.contributionCount)
      })
    })

    return NextResponse.json({
      contributions,
      totalContributions: contributionData.totalContributions,
      restrictedCount: collection.restrictedContributionsCount,
      publicContributions: collection.totalCommitContributions,
      startDate: contributionData.weeks[0]?.contributionDays[0]?.date || from.toISOString().split("T")[0],
    })
  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
