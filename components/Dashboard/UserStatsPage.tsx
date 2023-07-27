import { FC } from 'react';
import { ActivityType } from '@prisma/client';
import { addDays, format, isSameWeek, isSameYear, startOfWeek } from 'date-fns';
import { useTheme } from 'next-themes';
import { trpc } from '@/utils/trpc';
import { themeColors } from '@/data/constants';
import { UserPageProps } from '.';
import ActivityChart from './ActivityChart';

function generateMonthsObject() {
  const months: Record<string, number> = {};
  for (let i = 0; i < 12; i++) {
    const monthName = format(new Date().setMonth(i), 'MMMM');
    months[monthName] = 0;
  }
  return months;
}

function generateDaysObject() {
  const firstDate = startOfWeek(new Date());
  const weekDays: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const day = format(addDays(firstDate, i), 'EEEE');
    weekDays[day] = 0;
  }
  return weekDays;
}

function groupDates(dates: string[], groupBy: 'days' | 'months') {
  const numberOfDatesIn = groupBy == 'days' ? generateDaysObject() : generateMonthsObject();
  const currentDate = new Date();

  dates.forEach(date => {
    const isSameDateInterval =
      (groupBy == 'days' && isSameWeek(new Date(date), currentDate)) ||
      (groupBy == 'months' && isSameYear(new Date(date), currentDate));

    if (isSameDateInterval) {
      numberOfDatesIn[format(new Date(date), groupBy == 'days' ? 'EEEE' : 'MMMM')]++;
    }
  });

  return numberOfDatesIn;
}

const Placeholder: FC = () => {
  return (
    <div className="m-auto my-5 flex max-w-[1400px] flex-col items-center gap-5 px-5 lg:flex-row">
      {new Array(2).fill(null).map((_, index) => (
        <div
          key={index}
          className="h-[300px] w-full animate-pulse rounded-xl bg-neutral lg:w-1/2"
        ></div>
      ))}
    </div>
  );
};

const UserStatsPage: FC<UserPageProps> = ({ user }) => {
  const { theme } = useTheme();
  const { data, isLoading } = trpc.getCurrentStats.useQuery(user.id);
  if (isLoading) return <Placeholder />;

  function getActiviyDates(activityType: ActivityType) {
    return data!.filter(({ type }) => type == activityType).map(({ date }) => date);
  }

  const stats = {
    searches: {
      color: themeColors.primary,
      days: groupDates(getActiviyDates('SEARCH'), 'days'),
      months: groupDates(getActiviyDates('SEARCH'), 'months')
    },
    downloads: {
      color: themeColors.secondary[theme === 'light' ? 'dark' : 'light'],
      days: groupDates(getActiviyDates('DOWNLOAD'), 'days'),
      months: groupDates(getActiviyDates('DOWNLOAD'), 'months')
    }
  };
  const labels = Object.keys(stats) as (keyof typeof stats)[];

  return (
    <div className="m-auto my-5 flex max-w-[1400px] flex-col items-center gap-5 px-5 lg:flex-row">
      <div className="relative max-h-[400px] w-full rounded-xl border-2 border-base-content p-4 transition-colors hover:border-primary lg:w-1/2">
        <h3 className="text-2xl font-semibold capitalize">weekly activities</h3>
        <ActivityChart
          type="line"
          theme={theme}
          data={{
            labels: Object.keys(stats.downloads.days),
            datasets: labels.map(label => ({
              label,
              data: Object.values(stats[label].days),
              backgroundColor: stats[label].color,
              borderColor: stats[label].color,
              tension: 0.3
            }))
          }}
        />
      </div>
      <div className="relative max-h-[400px] w-full rounded-xl border-2 border-base-content p-4 transition-colors hover:border-primary lg:w-1/2">
        <h3 className="text-2xl font-semibold capitalize">monthly activities</h3>
        <ActivityChart
          type="bar"
          theme={theme}
          data={{
            labels: Object.keys(stats.downloads.months),
            datasets: labels.map(label => ({
              label,
              data: Object.values(stats[label].months),
              backgroundColor: stats[label].color,
              borderRadius: 3
            }))
          }}
        />
      </div>
    </div>
  );
};

export default UserStatsPage;
