const { EntitySchema } = require("typeorm");

// 課程章節表：儲存每一堂課的章節影片資訊
module.exports = new EntitySchema({
  name: "Course_Chapter", // Entity 名稱
  tableName: "course_chapter", // 對應的資料表名稱

  // === 欄位定義 ===
  columns: {
    // 主鍵：每個章節的唯一 ID
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    // 課程 ID，對應到哪一門課程（外鍵）
    course_id: {
      type: "uuid",
      nullable: false,
    },

    // 章節主標題（例如：「第 1 週：暖身訓練」）
    title: {
      type: "varchar",
      length: 50,
      nullable: false,
    },

    // 章節副標題（例如：「上半身熱身」）
    subtitle: {
      type: "varchar",
      length: 50,
      nullable: false,
    },

    // 此章節影片網址陣列（多支影片）
    course_video_urls: {
      type: "varchar",
      isArray: true,
      nullable: false,
    },

    // 建立時間（新增時自動填入）
    created_at: {
      type: "timestamp",
      createDate: true,
      nullable: false, // 不可為空
    },

    // 最後更新時間（每次更新自動變動）
    update_at: {
      type: "timestamp",
      updateDate: true,
      nullable: false, // 不可為空
    },
  },

  // === 關聯定義 ===
  relations: {
    // 關聯到 Course 表（多對一），一門課程可以有多個章節
    Course: {
      target: "Course",
      type: "many-to-one",
      joinColumn: {
        name: "course_id", // 本表欄位
        referencedColumnName: "id", // Course 表中的主鍵
        foreignKeyConstraintName: "fk_course_chapter_course_id",
      },
      onDelete: "CASCADE", // 若課程被刪除，相關章節一併刪除
    },
  },
});
