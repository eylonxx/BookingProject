import dal from '../2-utils/dal';
import FollowModel from '../4-models/follow-model';

async function follow(followInfo: FollowModel): Promise<void> {
  const { vacationId, userId } = followInfo;
  const sql = `
INSERT INTO followers
(vacationId, userId)
VALUES (${vacationId}, ${userId})
`;
  await dal.execute(sql);
}

async function unfollow(followInfo: FollowModel): Promise<void> {
  const { vacationId, userId } = followInfo;

  const sql = `
    DELETE FROM followers
    WHERE vacationId = ${vacationId} AND userId = ${userId};
`;

  await dal.execute(sql);
}

export default {
  follow,
  unfollow,
};
