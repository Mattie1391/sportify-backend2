const { EntitySchema } = require("typeorm");

// User（學員）資料表的 Entity 定義
module.exports = new EntitySchema({
  name: "User", // Entity 名稱，用於程式中操作資料庫
  tableName: "user", // 對應資料庫的實際資料表名稱

  // === 欄位定義 ===
  columns: {
    // 使用者 ID，主鍵，唯一識別每位使用者
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid", // 自動產生 UUID
    },

    // 使用者名稱（顯示用）
    name: {
      type: "varchar",
      length: 50,
      nullable: false,
    },

    // 使用者 email，需唯一，用於登入
    email: {
      type: "varchar",
      length: 320,
      nullable: false,
      unique: true,
    },

    // 密碼（建議為雜湊加密字串）
    password: {
      type: "varchar",
      length: 72,
      nullable: false,
    },

    // 訂閱方案 ID（若有訂閱才會有值）
    subscription_id: {
      type: "uuid",
      nullable: true,
    },

    // 是否有訂閱方案
    is_subscribed: {
      type: "boolean",
      nullable: false,
      default: false, // 預設為尚未訂閱
    },

    // 頭像圖片網址
    profile_image_url: {
      type: "varchar",
      length: 2048,
      nullable: true,
    },

    // 資料建立時間（自動填入）
    created_at: {
      type: "timestamp",
      createDate: true,
    },

    // 資料更新時間（每次更新自動變動）
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },

  // === 關聯定義 ===
  relations: {
    // ➤ 與訂閱資料的關聯：每位使用者可有一筆訂閱紀錄（many-to-one）
    Subscription: {
      target: "Subscription", // 關聯的目標 entity 名稱
      type: "many-to-one",
      joinColumn: {
        name: "subscription_id", // 本表中的欄位
        referencedColumnName: "id", // 關聯表的欄位
      },
      onDelete: "SET NULL", // 若訂閱紀錄被刪除，使用者資料保留，設為 null
      nullable: true,
    },

    // ➤ 使用者收藏的課程（User → UserCourseFavorite 一對多）
    UserCourseFavorites: {
      target: "User_Course_Favorite", // 關聯到中介表
      type: "one-to-many",
      inverseSide: "User", // 對方 entity 裡的欄位名
    },
  },
});
