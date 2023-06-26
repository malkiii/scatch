import { FC, useState } from 'react';
import { ActivityType } from '@prisma/client';
import { addDays, format, isSameWeek, isSameYear, startOfWeek } from 'date-fns';
import { trpc } from '@/utils/trpc';
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
    <div className="max-w-[1400px] m-auto flex flex-col lg:flex-row items-center my-5 px-5 gap-5">
      {new Array(2).fill(null).map((_, index) => (
        <div
          key={index}
          className="h-[300px] w-full lg:w-1/2 rounded-xl bg-cs-change animate-pulse"
        ></div>
      ))}
    </div>
  );
};

const UserStatsPage: FC<UserPageProps> = ({ user }) => {
  const { data, isLoading } = trpc.getCurrentStats.useQuery(user.id);
  if (isLoading) return <Placeholder />;

  function getActiviyDates(activityType: ActivityType) {
    return data!.filter(({ type }) => type == activityType).map(({ date }) => date);
  }

  const stats = {
    downloads: {
      color: 'rgb(6, 182, 212)',
      days: groupDates(getActiviyDates('DOWNLOAD'), 'days'),
      months: groupDates(getActiviyDates('DOWNLOAD'), 'months')
    },
    searches: {
      color: 'rgb(34, 211, 238)',
      days: groupDates(getActiviyDates('SEARCH'), 'days'),
      months: groupDates(getActiviyDates('SEARCH'), 'months')
    }
  };
  type Label = keyof typeof stats;

  return (
    <div className="max-w-[1400px] m-auto flex flex-col lg:flex-row items-center my-5 px-5 gap-5">
      <div className="relative max-h-[400px] w-full lg:w-1/2 border-2 rounded-xl p-4 border-dark/40 hover:border-dark dark:border-white/40 dark:hover:border-white transition-colors">
        <h3 className="text-2xl font-semibold capitalize">weekly activities</h3>
        <ActivityChart
          type="line"
          data={{
            labels: Object.keys(stats.downloads.days),
            datasets: Object.keys(stats).map(label => ({
              label,
              data: Object.values(stats[label as Label].days),
              backgroundColor: stats[label as Label].color,
              borderColor: stats[label as Label].color,
              tension: 0.3
            }))
          }}
        />
      </div>
      <div className="relative max-h-[400px] w-full lg:w-1/2 border-2 rounded-xl p-4 border-dark/40 hover:border-dark dark:border-white/40 dark:hover:border-white transition-colors">
        <h3 className="text-2xl font-semibold capitalize">monthly activities</h3>
        <ActivityChart
          type="bar"
          data={{
            labels: Object.keys(stats.downloads.months),
            datasets: Object.keys(stats).map(label => ({
              label,
              data: Object.values(stats[label as Label].months),
              backgroundColor: stats[label as Label].color,
              borderRadius: 3
            }))
          }}
        />
      </div>
    </div>
  );
};
export default UserStatsPage;
