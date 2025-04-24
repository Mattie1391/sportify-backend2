const { EntitySchema } = require("typeorm");

// 講師薪資轉帳紀錄表：記錄每位教練的轉帳狀態與金額
module.exports = new EntitySchema({
  name: "Payment_Transfer",
  tableName: "payment_transfer",

  // === 欄位定義 ===
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true, // 自動遞增主鍵
    },
    // 轉帳時間
    transfered_at: {
      type: "timestamp", // 儲存轉帳發生的時間
      nullable: false, // 此欄位為必填
    },

    // 金額（以新台幣計價）
    amount: {
      type: "int", // 儲存轉帳金額，單位為新台幣
      nullable: false, // 此欄位為必填
    },

    // 是否已完成轉帳
    is_transfered: {
      type: "boolean", // 儲存轉帳是否已完成的狀態
      nullable: false, // 此欄位為必填
    },

    // 講師 ID（外鍵）
    coach_id: {
      type: "uuid", // 儲存講師的唯一識別碼
      nullable: false, // 此欄位為必填
    },
  },

  // === 關聯定義 ===
  relations: {
    // 每筆轉帳紀錄對應一位講師（多對一關聯）
    Coach: {
      target: "Coach", // 目標關聯的實體
      type: "many-to-one", // 多對一的關聯類型
      joinColumn: {
        name: "coach_id", // 本表中的外鍵名稱
        referencedColumnName: "id", // 目標表中的主鍵名稱
        foreignKeyConstraintName: "fk_payment_transfer_coach_id", // 外鍵約束名稱
      },
      onDelete: "CASCADE", // 如果講師被刪除，對應的轉帳紀錄也一併刪除
    },
  },
});
