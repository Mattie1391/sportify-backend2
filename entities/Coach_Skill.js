const { EntitySchema } = require("typeorm");

// 教練與技能的中介表，記錄每位教練擁有哪些技能（多對多關係）
// 每筆資料代表「某位教練擁有某一個技能」
module.exports = new EntitySchema({
  name: "Coach_Skill", // Entity 名稱，用於程式內使用 getRepository("CoachSkill") 查詢
  tableName: "coach_skill", // 對應資料庫中的資料表名稱

  // === 欄位定義 ===
  columns: {
    // 教練 ID，是主鍵的一部分，同時也是外鍵
    coach_id: {
      primary: true,
      type: "uuid",
      nullable: false,
    },
    // 技能 ID，是主鍵的一部分，同時也是外鍵
    skill_id: {
      primary: true,
      type: "uuid",
      nullable: false,
    },
  },

  // === 關聯定義 ===
  relations: {
    // Coach: 多對一關聯（many-to-one）
    // 一位教練可以出現在多筆 coach_skill 資料中（代表他有多個技能）
    Coach: {
      target: "Coach", // 關聯的目標 Entity 名稱（必須有 Coach.js）
      type: "many-to-one", // 多對一的意思：多筆 coach_skill 連到同一位 Coach
      joinColumn: {
        name: "coach_id", // coach_skill 資料表中使用的欄位名稱
        referencedColumnName: "id", // Coach 資料表中對應的欄位
        foreignKeyConstraintName: "fk_coach_skill_coach_id", // 外鍵名稱，可自定，方便資料庫管理
      },
      onDelete: "CASCADE", // 若 Coach 被刪除，這位教練對應的所有技能連結也會自動刪除
    },

    // Skill: 多對一關聯（many-to-one）
    // 一個技能可以被多位教練擁有，因此這裡也是多對一
    Skill: {
      target: "Skill",
      type: "many-to-one",
      joinColumn: {
        name: "skill_id", // coach_skill 表中本地欄位名稱
        referencedColumnName: "id", // 對應 Skill 表的主鍵
        foreignKeyConstraintName: "fk_coach_skill_skill_id", // 外鍵名稱
      },
      onDelete: "CASCADE", // 若 Skill 被刪除，對應的所有關聯資料也會自動刪除
    },
  },
});
