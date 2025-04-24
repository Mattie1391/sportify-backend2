const { EntitySchema } = require("typeorm");

// 課程表：儲存平台上所有課程的基本資訊
module.exports = new EntitySchema({
  name: "Course", // Entity 名稱
  tableName: "course", // 資料表名稱

  // === 欄位定義 ===
  columns: {
    // 課程 ID，主鍵，自動產生 UUID
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    // 課程名稱（例如：初階核心訓練）
    name: {
      type: "varchar",
      length: 50,
      nullable: false,
      unique: true,
    },

    // 上課教練 ID（外鍵）
    coach_id: {
      type: "uuid",
      nullable: false,
    },

    // 課程介紹（長文）
    description: {
      type: "varchar",
      length: 2048,
      nullable: false,
    },

    // 課程類別 ID（對應技能分類）
    type_id: {
      type: "uuid",
      nullable: false,
    },

    // 課程圖片網址
    picture_url: {
      type: "varchar",
      length: 2048,
      nullable: false,
    },

    // 學生數量
    student_amount: {
      type: "int",
      nullable: false,
    },

    // 觀看次數
    numbers_of_view: {
      type: "int",
      nullable: false,
    },

    // 課程總時數（分鐘）
    total_hours: {
      type: "int",
      nullable: false,
    },

    // 是否通過審核
    is_approved: {
      type: "boolean",
      nullable: false,
    },

    // 審核通過的時間
    approved_at: {
      type: "timestamp",
      nullable: false,
    },

    // 建立時間（自動產生）
    created_at: {
      type: "timestamp",
      createDate: true,
    },

    // 更新時間（每次變更自動更新）
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },

  // === 關聯設定 ===
  relations: {
    // 每門課程由一位教練負責（多對一關聯）
    Coach: {
      target: "Coach",
      type: "many-to-one",
      joinColumn: {
        name: "coach_id", // 本表中的欄位名
        referencedColumnName: "id", // 對應 Coach 表的主鍵
        foreignKeyConstraintName: "fk_course_coach_id",
      },
      onDelete: "CASCADE", // 若該教練被刪除，所有課程也一併刪除
    },
  },
});
