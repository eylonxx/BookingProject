import dal from '../2-utils/dal';
import FollowModel from '../4-models/follow-model';
import VacationModel from '../4-models/vacation-model';

async function follow(followInfo: FollowModel): Promise<boolean> {
  const { vacationId, userId } = followInfo;
  let sql = `
    INSERT INTO followers
    (vacationId, userId)
    VALUES (${vacationId}, ${userId});
    `;
  await dal.execute(sql);

  sql = `
    UPDATE vacations
    SET followers = followers + 1
    WHERE id = ${vacationId};
`;
  await dal.execute(sql);
  return true;
}

async function unfollow(followInfo: FollowModel): Promise<boolean> {
  const { vacationId, userId } = followInfo;
  let sql = `
    UPDATE vacations
    SET followers = followers - 1
    WHERE id = ${vacationId};
    `;
  await dal.execute(sql);

  sql = `
    DELETE FROM followers
    WHERE vacationId = ${vacationId} AND userId = ${userId};
    `;

  await dal.execute(sql);
  return true;
}

async function getAllFollowedVacationsByUserId(userId: number): Promise<string[]> {
  const sql = `
SELECT vacationId FROM followers
WHERE userId = ${userId}
`;

  const result = await dal.execute(sql);

  return result;
}

export default {
  follow,
  unfollow,
  getAllFollowedVacationsByUserId,
};
