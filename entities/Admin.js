const { EntitySchema } = require("typeorm");

// Admin（管理員）資料表的 Entity 定義
module.exports = new EntitySchema({
  name: "Admin", // Entity 名稱，供 TypeORM 內部使用
  tableName: "admin", // 對應資料庫中的資料表名稱

  columns: {
    // 管理員 ID，作為主鍵。主鍵代表每一筆資料的唯一識別，其他資料表如果要參考 admin 資料，就會透過這個欄位。
    id: {
      primary: true, // 主鍵，表示此欄位是資料表的唯一識別
      type: "uuid", // 資料型別是 UUID（全球唯一識別碼）
      generated: "uuid", // 自動產生 UUID
    },
    // 使用者 email，需唯一，用於登入
    email: {
      type: "varchar",
      length: 320,
      nullable: false,
      unique: true,
    },
    // 管理員密碼，用於登入驗證
    password: {
      type: "varchar", // 字串型別
      length: 50, // 最長長度為 72 個字元（bcrypt 加密後密碼大概會落在這範圍）
      nullable: false, // 不可為空，必須填寫
    },
  },
});
