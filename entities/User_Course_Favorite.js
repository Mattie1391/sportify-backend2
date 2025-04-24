const { EntitySchema } = require("typeorm");

// 使用者課程收藏表：記錄哪些使用者收藏了哪些課程
module.exports = new EntitySchema({
  name: "User_Course_Favorite",
  tableName: "user_course_favorite",

  // === 欄位定義 ===
  columns: {
    // 使用者 ID，是複合主鍵的一部分
    user_id: {
      primary: true,
      type: "uuid",
      nullable: false,
    },

    // 課程 ID，是複合主鍵的一部分
    course_id: {
      primary: true,
      type: "uuid",
      nullable: false,
    },
  },

  // === 關聯設定 ===
  relations: {
    // 一筆收藏資料屬於一位使用者
    User: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_user_course_favorite_user_id",
      },
      onDelete: "CASCADE", // 若使用者被刪除，對應的收藏資料也刪除
    },

    // 一筆收藏資料對應一門課程
    Course: {
      target: "Course",
      type: "many-to-one",
      joinColumn: {
        name: "course_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_user_course_favorite_course_id",
      },
      onDelete: "CASCADE", // 若課程被刪除，對應的收藏資料也刪除
    },
  },
});
