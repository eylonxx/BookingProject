import dal from '../2-utils/dal';
import FollowModel from '../4-models/follow-model';

async function follow(followInfo: FollowModel): Promise<boolean> {
  const { vacationId, userId } = followInfo;
  let sql = `
    INSERT INTO followers
    (vacationId, userId)
    VALUES (?, ?);
    `;
  await dal.execute(sql, [vacationId, userId]);

  sql = `
    UPDATE vacations
    SET followers = followers + 1
    WHERE id = ?;
`;
  await dal.execute(sql, [vacationId]);
  return true;
}

async function unfollow(followInfo: FollowModel): Promise<boolean> {
  const { vacationId, userId } = followInfo;
  let sql = `
    UPDATE vacations
    SET followers = followers - 1
    WHERE id = ?;
    `;
  await dal.execute(sql, [vacationId]);

  sql = `
    DELETE FROM followers
    WHERE vacationId = ? AND userId = ?;
    `;

  await dal.execute(sql, [vacationId, userId]);
  return true;
}

async function getAllFollowedVacationsByUserId(userId: number): Promise<string[]> {
  const sql = `
SELECT vacationId FROM followers
WHERE userId = ?
`;

  const result = await dal.execute(sql, [userId]);

  return result;
}

export default {
  follow,
  unfollow,
  getAllFollowedVacationsByUserId,
};
