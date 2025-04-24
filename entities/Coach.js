const { EntitySchema } = require("typeorm");

// Coach（教練）資料表的 Entity 定義
module.exports = new EntitySchema({
  name: "Coach", // Entity 名稱，程式中會用 getRepository("Coach") 呼叫
  tableName: "coach", // 對應到資料庫中的實際資料表名稱

  // === 欄位定義 ===
  columns: {
    id: {
      primary: true, // 主鍵，每位教練唯一的識別碼
      type: "uuid",
      generated: "uuid", // 自動產生 UUID
    },
    email: {
      type: "varchar",
      length: 320,
      nullable: false,
      unique: true, // 電子郵件不可重複
    },
    password: {
      type: "varchar",
      length: 50,
      nullable: false, // 密碼
    },
    nickname: {
      type: "varchar",
      length: 50,
      nullable: false, // 前端顯示的暱稱
    },
    realname: {
      type: "varchar",
      length: 50,
      nullable: false, // 教練真實姓名，用於內部核對
    },
    job_title: {
      type: "varchar",
      length: 100,
      nullable: false, // 頭銜，例如「資深健身教練」
    },
    skill_description: {
      type: "varchar",
      nullable: false, // 教練擅長的技能簡介
    },
    about_me: {
      type: "varchar",
      nullable: true, // 自我介紹，可空
    },
    experience_years: {
      type: "int",
      nullable: false, // 教學經驗年數
    },
    experience: {
      type: "varchar",
      nullable: false, // 教學經驗年數
    },
    id_number: {
      type: "varchar",
      length: 20,
      nullable: false, // 身分證號或居留證號碼
    },
    phone_number: {
      type: "varchar",
      length: 30,
      nullable: false, // 聯絡用手機號碼
    },
    birthday: {
      type: "date",
      nullable: true, // 出生日期，可空
    },
    license_url: {
      type: "varchar",
      length: 2048,
      nullable: true, // 技能證照圖片網址，可空
    },
    profile_image_url: {
      type: "varchar",
      length: 2048,
      nullable: true, // 頭像圖片網址
    },
    background_image_url: {
      type: "varchar",
      length: 2048,
      nullable: true, // 頁面背景圖片網址
    },
    bankbook_copy_url: {
      type: "varchar",
      length: 2048,
      nullable: false, // 存摺影本網址（薪資轉帳帳號）
    },
    created_at: {
      type: "timestamp",
      createDate: true, // 自動生成建立時間
    },
    updated_at: {
      type: "timestamp",
      updateDate: true, // 每次更新會自動刷新這個欄位
    },
  },

  // === 關聯定義 ===
  relations: {
    // 一位教練可以擁有多個技能（透過 CoachSkill 中介表連結）
    CoachSkills: {
      target: "Coach_Skill",
      type: "one-to-many", // 一對多關聯：一位教練對應多個技能連結
      inverseSide: "Coach", // 對方 entity（CoachSkill）中定義的關聯欄位名
    },

    // 一位教練可以有多筆轉帳記錄（薪水）
    PaymentTransfers: {
      target: "Payment_Transfer",
      type: "one-to-many", // 一對多關聯：一位教練對應多筆轉帳記錄
      inverseSide: "Coach", // 對方 entity（PaymentTransfer）中定義的關聯欄位名
    },

    // 一位教練可以收到多個學生評價
    Ratings: {
      target: "Rating",
      type: "one-to-many", // 一對多關聯：一位教練對應多個評價
      inverseSide: "Coach", // 對方 entity（Rating）中定義的關聯欄位名
    },
  },
});
