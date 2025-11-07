import { google } from "googleapis";

export function getSheets() {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    undefined,
    // Next puts envs as single line; convert \n to real newlines if needed:
    (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDLeaGVbQ5rd2m6\ndrvbE0JX/qiF9+qAkuWTu7jJVSEZGAx7oMBhjHMjbGr3tsYe+d32b5p8vAMqx38j\ng0XtCIfCgsjr7oK8uzjsSV+4YsnID1wR3SQ0D9De7BsZMgOrrmcJdohy3r6hXHEH\nV197DUTgAuprAOs1J5WUhH6uSAex9CQ6sy9ApTNyCUMVEK0Y+QA1CRoOMTmSd0/P\ntRVp0f3T+Z4oAlFA1CLNaYMNHEUDgq+7xNovbpFsQhbQm3uS86EIwldJRz+RUcOJ\n3ddQmQEXDTAPg3J6vBBtTay5uutUe2Z/vMTIZzGIURnXYGkiOQv1MiLzp8yPaUGb\n7HZz8gOPAgMBAAECggEASNGIsE9NH8yme+LOLALidVdfvEITHFx16L7/zJ24sKBY\np03KS57V/dFpHqm8kY1ekDk0kns+ruqiZ3UtazzoSQZBHZ5ID375SiagKP7Bs+U7\nT/FSaYdXetAIiqXJhoFtwoc3IdTxaBILKVNtij4fbgPdHNpBUs6Ny473PyvsBRT0\n6MTsh5Yq2Q/FZi/nHpnUNMzWOmpAActaDzhJPxkFzCzmTNf4Ns8oTiMrXh3wWuAX\n7vpr3xoTDFQkj9xPR9vAS4JVWfF03EzjF9LrEzTwNNWX6c1eLnzSwJZ7xzhbq6oi\nhjS4g0K67hRjb7teC/wuRbWcoE1ZIolkn19I9P4b4QKBgQDwFmLaQsOUQKcgZFTg\nV507o1zSwqaO3aGFzq8BUmS+7F976w+ASVvaOJjr1AbMy+oT2OzZ+R4RpdmgEn7G\nx3sQ1KYpHU56ARwXOvwo8dSgLfJP0xuTYOS3Ykv3VK+pX+haxzIKJ0Gv/SMNHUXM\nxXvbIoSdC3nC/lcK77bclCQPWQKBgQDY9gk9TPa0cR69yu/qX4GXIk6StDYMnQD4\naIQN2th8j69pqySqFDoOUyfwFCe23DuavT+pfKa0OmCuwh6MoDbrPhnxvk+f2ALc\nCuGP6oAk/WMf/G4SRZ8DUrn4p/OKYw7XaZztZ/tqcFCL3QXrHCnbgz1mlPbbfCFl\nAmUkpPB1JwKBgQCO2pMZEU60IMAQqwJBtoAM40gw87cNHNyl9HP3EmJ1o8mwvw2r\nJHst3i1HbRJaux5djt5nWC5HC+rwrvCWME2OlykDH7f5Kj3fqK4vYq1EXfJnAtLO\nn4GXiDpxQQeAfVuQ4CNrHS6dm75GaFuG2x62JdTIaPKbTqDWFgo1N0Q5iQKBgQCd\nhVSD+0MLEy48ogC6a4kND814Wfr8AWnY8RkfbgrLtQ6oa6d9DJ5yFBHlDt0euJtV\n5503Etd99vyHJU1E0HXPKhFwILpy1USOOiA2ew16zbWQXZgVEBM5OHDphhceHHmE\nEJvtChfR2aXBRkGrx5DkXU7REcqA5Ijia3C/wDkM9QKBgQDKxYipS5i3Cqb2OuED\nR1JZx7rtiLpz3hK7TOOc1ocd60FdxLJULuGWjxeSq30OuE2zuEnQTsXUDvU7iXzK\njDtUS12BZyCBF4UDzQICm8QT7YwwuF3kOf6oAm0Yzq6eJMNdzq5GDDw8TxDbXv5V\n4soQSTaZ7Z17pLE2LDqe2Xi5Pg==\n-----END PRIVATE KEY-----\n").replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"] // read+write scope
  );
  return google.sheets({ version: "v4", auth });
}


