const LEETCODE_ENDPOINT = 'https://leetcode.com/graphql';
const DEFAULT_USERNAME = 'Pavan04Codes';

const QUERY = `
  query ($username: String!) {
    allQuestionsCount { difficulty count }
    matchedUser(username: $username) {
      username
      profile { ranking }
      submitStatsGlobal { acSubmissionNum { difficulty count submissions } }
      userCalendar { totalActiveDays streak }
    }
  }
`;

function findByDifficulty(items = [], difficulty) {
  return items.find((item) => item.difficulty === difficulty) || { count: 0, submissions: 0 };
}

function normalizeStats(data) {
  const user = data?.matchedUser;
  if (!user) throw new Error('LeetCode user not found');

  const questions = data.allQuestionsCount || [];
  const submissions = user.submitStatsGlobal?.acSubmissionNum || [];
  const all = findByDifficulty(submissions, 'All');

  return {
    username: user.username,
    totalSolved: all.count,
    totalQuestions: findByDifficulty(questions, 'All').count,
    easySolved: findByDifficulty(submissions, 'Easy').count,
    easyTotal: findByDifficulty(questions, 'Easy').count,
    mediumSolved: findByDifficulty(submissions, 'Medium').count,
    mediumTotal: findByDifficulty(questions, 'Medium').count,
    hardSolved: findByDifficulty(submissions, 'Hard').count,
    hardTotal: findByDifficulty(questions, 'Hard').count,
    acceptance: all.submissions ? (all.count / all.submissions) * 100 : 0,
    ranking: user.profile?.ranking || 0,
    streakDays: user.userCalendar?.streak || 0,
    contestsAttended: null,
    updatedAt: new Date().toISOString(),
  };
}

export default async function handler(req, res) {
  const username = String(req.query?.username || DEFAULT_USERNAME).trim();
  if (!/^[A-Za-z0-9_-]+$/.test(username)) {
    return res.status(400).json({ error: 'Invalid LeetCode username' });
  }

  try {
    const response = await fetch(LEETCODE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com/',
        'User-Agent': 'portfolio-leetcode-stats',
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`LeetCode returned ${response.status}`);

    const payload = await response.json();
    if (payload.errors?.length) throw new Error(payload.errors[0].message);
    return res.status(200).json(normalizeStats(payload.data));
  } catch (error) {
    console.error('Unable to fetch LeetCode stats:', error.message);
    return res.status(502).json({ error: 'Unable to fetch LeetCode stats' });
  }
};