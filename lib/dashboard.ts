interface GumStat {
  date: string;
  gums: number;
  users: number;
}

export async function getGumCreationStats(): Promise<GumStat[]> {
  // Mock data for the last 7 days
  const mockData: GumStat[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    mockData.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      gums: Math.floor(Math.random() * 20) + 1, // Random number between 1-20
      users: Math.floor(Math.random() * 10) + 1, // Random number between 1-10
    });
  }

  return mockData;
}
