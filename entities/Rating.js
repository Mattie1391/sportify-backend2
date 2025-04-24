const { EntitySchema } = require("typeorm");

// Rating 表：儲存課程評價留言與分數，學生對課程的回饋
module.exports = new EntitySchema({
  name: "Rating",
  tableName: "rating",

  // === 欄位定義 ===
  columns: {
    // 評價 ID，主鍵
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    // 評語留言
    comment: {
      type: "varchar",
      length: 100,
      nullable: false,
    },

    // 星星數（1.0 ~ 5.0，浮點數）
    score: {
      type: "float",
      nullable: false,
    },

    // 評價者（使用者）ID
    user_id: {
      type: "uuid",
      nullable: false,
    },

    // 評論的課程 ID
    course_id: {
      type: "uuid",
      nullable: false,
    },

    // 建立時間
    created_at: {
      type: "timestamp",
      createDate: true,
    },

    // 更新時間（例如修改留言）
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },

  // === 關聯設定 ===
  relations: {
    // 一則評價屬於一位學生（使用者）
    User: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_rating_user_id",
      },
      onDelete: "CASCADE",
    },

    // 一則評價對應一門課程
    Course: {
      target: "Course",
      type: "many-to-one",
      joinColumn: {
        name: "course_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_rating_course_id",
      },
      onDelete: "CASCADE",
    },
  },
});
