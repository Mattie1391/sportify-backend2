const AppDataSource = require("./data-source");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

AppDataSource.initialize()
  .then(async () => {
    try {
      await AppDataSource.dropDatabase(); //刪掉所有資料表
      await AppDataSource.synchronize(); // 重新建表
      const adminRepo = AppDataSource.getRepository("Admin");
      const userRepo = AppDataSource.getRepository("User");
      const coachRepo = AppDataSource.getRepository("Coach");
      const courseRepo = AppDataSource.getRepository("Course");
      const planRepo = AppDataSource.getRepository("Plan");
      const subscriptionRepo = AppDataSource.getRepository("Subscription");
      const subscriptionSkillRepo = AppDataSource.getRepository("Subscription_Skill");
      const ratingRepo = AppDataSource.getRepository("Rating");
      const coachSkillRepo = AppDataSource.getRepository("Coach_Skill");
      const skillRepo = AppDataSource.getRepository("Skill");
      const favoriteRepo = AppDataSource.getRepository("User_Course_Favorite");
      const chapterRepo = AppDataSource.getRepository("Course_Chapter");
      const paymentRepo = AppDataSource.getRepository("Payment_Transfer");
      const videoRepo = AppDataSource.getRepository("Course_Video");

      // 建立 Admin
      await adminRepo.save([
        {
          email: "admin@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
        },
        {
          email: "admin1@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
        },
        {
          email: "admin2@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
        },
      ]);

      // 建立 User
      await userRepo.save([
        {
          name: "user",
          email: "user@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
          is_subscribed: true,
        },
        {
          name: "user1",
          email: "user1@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
          is_subscribed: false,
        },
        {
          name: "user2",
          email: "user2@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
          is_subscribed: true,
        },
      ]);
      const users = await userRepo.find();
      const user1 = await userRepo.findOneBy({ email: "user@gmail.com" });
      const user2 = await userRepo.findOneBy({ email: "user1@gmail.com" });
      const user3 = await userRepo.findOneBy({ email: "user2@gmail.com" });

      // 建立 Coach
      await coachRepo.save([
        {
          email: "michael@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
          nickname: "Michael",
          realname: "林邁可",
          job_title: "RYT 500認證導師",
          skill_description: "瑜伽",
          about_me:
            "我是Michael，RYT500瑜伽認證導師，教學經驗12年，擅長陰瑜伽、修復瑜伽與情緒釋放導引。我曾進修印度阿育吠陀與能量呼吸法，期望用整合的方式幫助學員調整身體與情緒。",
          experience_years: 12,
          experience: "印度阿育吠陀與能量呼吸法官方大使",
          id_number: "A123456789",
          phone_number: "0912345678",
          birthday: "1980-01-01",
          license_url:
            "https://img.freepik.com/premium-photo/mature-fitness-coach-gym-beautiful-illustration-picture-generative-ai_146671-94599.jpg",
          profile_image_url:
            "https://img.freepik.com/premium-photo/mature-fitness-coach-gym-beautiful-illustration-picture-generative-ai_146671-94599.jpg",
          background_image_url:
            "https://img.freepik.com/premium-photo/mature-fitness-coach-gym-beautiful-illustration-picture-generative-ai_146671-94599.jpg",
          bankbook_copy_url:
            "https://img.freepik.com/premium-photo/mature-fitness-coach-gym-beautiful-illustration-picture-generative-ai_146671-94599.jpg",
        },
        {
          email: "ivy@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
          nickname: "Ivy",
          realname: "陳艾薇",
          job_title: "AFC B級女足教練",
          skill_description: "足球",
          about_me:
            "大家好，我是 Ivy，目前是 AFC（亞洲足協）B級認證的女足教練。從國中時期我就是學校女子足球隊的一員，後來更參與了多場校際與地區性比賽，累積了豐富的場上經驗與教學熱情。",
          experience_years: 8,
          experience: "國際認證健身教練,曾任木蘭女子足球聯賽先發球員，112學年大專盃足球聯賽MVP",
          id_number: "B987654321",
          phone_number: "0987654321",
          birthday: "1985-05-15",
          license_url:
            "https://media.nownews.com/nn_media/thumbnail/2023/07/1689788177654-cb78e8f32f744d70a8263542b036b855-800x534.jpg?unShow=false",
          profile_image_url:
            "https://media.nownews.com/nn_media/thumbnail/2023/07/1689788177654-cb78e8f32f744d70a8263542b036b855-800x534.jpg?unShow=false",
          background_image_url:
            "https://media.nownews.com/nn_media/thumbnail/2023/07/1689788177654-cb78e8f32f744d70a8263542b036b855-800x534.jpg?unShow=false",
          bankbook_copy_url:
            "https://media.nownews.com/nn_media/thumbnail/2023/07/1689788177654-cb78e8f32f744d70a8263542b036b855-800x534.jpg?unShow=false",
        },
        {
          email: "jenni@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
          nickname: "Jenni",
          realname: "李傑尼",
          job_title: "PMA國家認證導師",
          skill_description: "皮拉提斯核心訓練",
          about_me:
            "Hi~我是Jenni，PMA認證導師，專研皮拉提斯10年。擅長結合動作科學與實務訓練，幫助學員提升核心力量與身體覺察，讓運動成為日常的一部分。我的專長是核心訓練、功能性動作重建與姿態調整，曾擔任多家健身中心與復健機構的專業顧問，幫助上千位學員找回健康與自信。",
          experience_years: 6,
          experience: "擁有國際皮拉提斯教學證照，曾任多家健身房與復健診所特聘教練",
          id_number: "C123456789",
          phone_number: "0900111222",
          birthday: "1990-08-18",
          license_url: "",
          profile_image_url: "",
          background_image_url: "",
          bankbook_copy_url: "",
        },
        {
          email: "karl@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
          nickname: "Karl",
          realname: "王卡爾",
          job_title: "UCI認證單車教練",
          skill_description: "單車",
          about_me:
            "我是 Karl，UCI（國際自由車聯盟）認證教練，熱愛單車運動已超過15年。無論是平路高速還是山道爬坡，我都相信單車是一種身體與心理的雙重鍛鍊。我曾帶領學員參加各種長途活動，從百K賽事到全台環島，也見證許多初學者從怯步到完成挑戰的過程。我的教學風格重視效率與實用性，讓你學得會、做得到。我特別喜歡幫助上班族與新手找到屬於自己的騎乘節奏，享受每一段汗水與風景帶來的成就感。",
          experience_years: 8,
          experience: "國際認證單車教練,曾任代表台灣出戰東京奧運",
          id_number: "B987554321",
          phone_number: "0987664321",
          birthday: "1985-05-15",
          license_url:
            "https://media.nownews.com/nn_media/thumbnail/2023/07/1689788177654-cb78e8f32f744d70a8263542b036b855-800x534.jpg?unShow=false",
          profile_image_url:
            "https://media.nownews.com/nn_media/thumbnail/2023/07/1689788177654-cb78e8f32f744d70a8263542b036b855-800x534.jpg?unShow=false",
          background_image_url:
            "https://media.nownews.com/nn_media/thumbnail/2023/07/1689788177654-cb78e8f32f744d70a8263542b036b855-800x534.jpg?unShow=false",
          bankbook_copy_url:
            "https://media.nownews.com/nn_media/thumbnail/2023/07/1689788177654-cb78e8f32f744d70a8263542b036b855-800x534.jpg?unShow=false",
        },
        {
          email: "cindy@gmail.com",
          password: bcrypt.hashSync("Test1234", 10),
          nickname: "Cindy",
          realname: "李傑尼",
          job_title: "PMA國家認證導師",
          skill_description: "皮拉提斯",
          about_me:
            "Hi~我是Jenni，PMA認證導師，專研皮拉提斯10年。擅長結合動作科學與實務訓練，幫助學員提升核心力量與身體覺察，讓運動成為日常的一部分。我的專長是核心訓練、功能性動作重建與姿態調整，曾擔任多家健身中心與復健機構的專業顧問，幫助上千位學員找回健康與自信。",
          experience_years: 6,
          experience: "擁有國際皮拉提斯教學證照，曾任多家健身房與復健診所特聘教練",
          id_number: "C123356789",
          phone_number: "0900611222",
          birthday: "1990-08-18",
          license_url: "",
          profile_image_url: "",
          background_image_url: "",
          bankbook_copy_url: "",
        },
      ]);
      const coaches = await coachRepo.find();
      const coach1 = await coachRepo.findOneBy({ email: "michael@gmail.com" });
      const coach2 = await coachRepo.findOneBy({ email: "ivy@gmail.com" });
      const coach3 = await coachRepo.findOneBy({ email: "jenni@gmail.com" });
      const coach4 = await coachRepo.findOneBy({ email: "karl@gmail.com" });
      const coach5 = await coachRepo.findOneBy({ email: "cindy@gmail.com" });

      // 建立 Skill
      const skillNames = [
        { activity_location_type: "室內運動", name: "瑜珈" },
        { activity_location_type: "室外運動", name: "足球" },
        { activity_location_type: "室外運動", name: "單車" },
        { activity_location_type: "室內運動", name: "皮拉提斯" },
        { activity_location_type: "室外運動", name: "籃球" },
        { activity_location_type: "室外運動", name: "登山" },
        { activity_location_type: "室外運動", name: "羽球" },
        { activity_location_type: "室內運動", name: "重訓" },
        { activity_location_type: "室外運動", name: "滑板" },
        { activity_location_type: "室內運動", name: "有氧" },
        { activity_location_type: "室內運動", name: "舞蹈" },
        { activity_location_type: "室外運動", name: "游泳" },
      ];
      await skillRepo.save(skillNames);
      const skills = await skillRepo.find();
      const skill1 = await skillRepo.findOneBy({ name: "瑜珈" });
      const skill2 = await skillRepo.findOneBy({ name: "足球" });
      const skill3 = await skillRepo.findOneBy({ name: "皮拉提斯" });
      const skill4 = await skillRepo.findOneBy({ name: "單車" });
      const skill5 = await skillRepo.findOneBy({ name: "籃球" });
      const skill6 = await skillRepo.findOneBy({ name: "登山" });
      const skill7 = await skillRepo.findOneBy({ name: "羽球" });
      const skill8 = await skillRepo.findOneBy({ name: "重訓" });
      const skill9 = await skillRepo.findOneBy({ name: "滑板" });
      const skill10 = await skillRepo.findOneBy({ name: "有氧" });
      const skill11 = await skillRepo.findOneBy({ name: "舞蹈" });
      const skill12 = await skillRepo.findOneBy({ name: "游泳" });

      // 建立 Course
      await courseRepo.save([
        {
          name: "身心平衡晨間瑜伽課程",
          coach_id: coach1.id,
          description:
            "清晨是啟動能量、調整呼吸與內在節奏的最佳時刻。本課程以晨間瑜伽為主軸，透過溫和伸展、呼吸練習與動靜整合的序列，引導你在一天開始前，釋放身體緊張、喚醒覺知，並建立身心協調的穩定感。課程安排包含基礎流動瑜伽（Vinyasa）、陰瑜伽與冥想，搭配引導語音與輔具使用技巧，適合各程度練習者。每天30分鐘的晨間練習，不只讓你活動筋骨，更是一種自我照顧的儀式，讓你在日常節奏中保留一段屬於自己的寧靜與力量。",
          type_id: skills.find((s) => s.name === "瑜珈").id,
          image_url:
            "https://img.freepik.com/premium-photo/mature-fitness-coach-gym-beautiful-illustration-picture-generative-ai_146671-94599.jpg",
          student_amount: 2346, //僅為展示用，實務上會由後台 API 控制與統計
          numbers_of_view: 2346, //同上
          total_hours: 33, //同上
          is_approved: true, //同上
          approved_at: new Date(), //同上
          score: 4.7,
        },
        {
          name: "足球技術與戰術全攻略",
          coach_id: coach2.id,
          description:
            "這堂課是專為熱愛足球的你所設計，無論你是剛開始接觸足球的新手，還是希望更進一步提升比賽技巧的進階球員，都能在課程中獲得實質幫助。課程從最基本的控球、傳球、帶球技巧開始，逐步延伸至射門、跑位、與對手一對一攻防實戰訓練，並搭配戰術模擬與場上思維建立，讓學員不只是會踢球，更能理解整體球賽的運作邏輯。我們將透過每週系統性訓練計畫，讓你培養穩定的腳下技術、良好的視野判斷，以及與隊友之間的配合默契。除了個人技能強化，也將介紹常見比賽陣型與策略應用，包含如何有效壓迫、防守轉攻、角球與自由球的安排等，幫助你成為懂戰術、會溝通、能領導的場上核心。課程最後也將進行小型比賽模擬，驗收學員成果，讓你不僅踢得好，也踢得聰明。",
          type_id: skills.find((s) => s.name === "足球").id,
          image_url: "https://example.com/football-course.jpg",
          student_amount: 2206, //僅為展示用，實務上會由後台 API 控制與統計
          numbers_of_view: 2206, //同上
          total_hours: 38, //同上
          is_approved: true, //同上
          approved_at: new Date(), //同上
          score: 4.7,
        },
        {
          name: "皮拉提斯30天炸裂核心肌群",
          coach_id: coach3.id,
          description:
            "這堂課為你量身打造30天的核心強化挑戰，從零開始，逐步進入高效訓練。課程以每日30分鐘為單位，針對腹部、背部、骨盆底等核心區域設計漸進式訓練內容，幫助你有效刺激深層肌群，改善駝背、腰痛與姿勢不良等問題。我們強調身體覺察與呼吸整合，讓你不只動得正確，也能「感受」每一個動作的力量與控制。課程同時融合皮拉提斯的訓練理念與現代解剖觀點，適合所有想增強核心穩定度、強化軀幹力量與塑造體態的人。",
          type_id: skills.find((s) => s.name === "皮拉提斯").id,
          image_url: "",
          student_amount: 1885,
          numbers_of_view: 1885,
          total_hours: 21,
          is_approved: true,
          approved_at: new Date(),
          score: 4.7,
        },
        {
          name: "全方位塑造優雅體態",
          coach_id: coach5.id,
          description:
            "這堂課為你量身打造30天的核心強化挑戰，從零開始，逐步進入高效訓練。課程以每日30分鐘為單位，針對腹部、背部、骨盆底等核心區域設計漸進式訓練內容，幫助你有效刺激深層肌群，改善駝背、腰痛與姿勢不良等問題。我們強調身體覺察與呼吸整合，讓你不只動得正確，也能「感受」每一個動作的力量與控制。課程同時融合皮拉提斯的訓練理念與現代解剖觀點，適合所有想增強核心穩定度、強化軀幹力量與塑造體態的人。",
          type_id: skills.find((s) => s.name === "皮拉提斯").id,
          image_url: "",
          student_amount: 2000,
          numbers_of_view: 2000,
          total_hours: 21,
          is_approved: true,
          approved_at: new Date(),
          score: 4.7,
        },
        {
          name: "長途單車訓練與肌耐力養成",
          coach_id: coach4.id,
          description:
            "這堂課為你量身打造30天的核心強化挑戰，從零開始，逐步進入高效訓練。課程以每日30分鐘為單位，針對腹部、背部、骨盆底等核心區域設計漸進式訓練內容，幫助你有效刺激深層肌群，改善駝背、腰痛與姿勢不良等問題。我們強調身體覺察與呼吸整合，讓你不只動得正確，也能「感受」每一個動作的力量與控制。課程同時融合皮拉提斯的訓練理念與現代解剖觀點，適合所有想增強核心穩定度、強化軀幹力量與塑造體態的人。",
          type_id: skills.find((s) => s.name === "單車").id,
          image_url: "",
          student_amount: 1988,
          numbers_of_view: 1885,
          total_hours: 42,
          is_approved: true,
          approved_at: new Date(),
          score: 4.7,
        },
      ]);
      const courses = await courseRepo.find();
      const course1 = await courseRepo.findOneBy({
        name: "身心平衡晨間瑜伽課程",
      });
      const course2 = await courseRepo.findOneBy({
        name: "足球技術與戰術全攻略",
      });
      const course3 = await courseRepo.findOneBy({
        name: "皮拉提斯30天炸裂核心肌群",
      });
      const course4 = await courseRepo.findOneBy({
        name: "全方位塑造優雅體態",
      });
      const course5 = await courseRepo.findOneBy({
        name: "長途單車訓練與肌耐力養成",
      });

      await planRepo.save([
        {
          name: "Wellness方案",
          intro:
            "這是入門級方案，讓您每月可以選擇觀看一種類別的課程，專注於提升身心健康，適合有特定需求的使用者。",
          pricing: 400,
          max_resolution: 720,
          livestream: false,
          sports_choice: 1,
        },
        {
          name: "Fitness方案",
          intro:
            "無論是瑜伽、足球或重量訓練，任意組合你喜歡的課程類別，挑戰自己，讓每次運動都充滿成就感！",
          pricing: 700,
          max_resolution: 1080,
          livestream: true,
          sports_choice: 3,
        },
        {
          name: "Eagerness方案",
          intro:
            "全平台無限開放，隨時隨地挑選你喜歡的課程，無限挑戰，讓運動成為習慣，打造最強身體！",
          pricing: 900,
          max_resolution: 2160,
          livestream: true,
          sports_choice: 0,
        },
        {
          name: "Eagerness方案-7天試用",
          intro:
            "全平台無限開放，隨時隨地挑選你喜歡的課程，無限挑戰，讓運動成為習慣，打造最強身體！",
          pricing: 0,
          max_resolution: 2160,
          livestream: true,
          sports_choice: 0,
        },
      ]);
      const plans = await planRepo.find();
      const plan1 = plans.find((p) => p.name === "Wellness方案");
      const plan2 = plans.find((p) => p.name === "Fitness方案");
      const plan3 = plans.find((p) => p.name === "Eagerness方案");
      const plan4 = plans.find((p) => p.name === "Eagerness方案-7天試用");

      //建立Coach_Skill
      await coachSkillRepo.save([
        {
          coach_id: coach1.id, // Michael
          skill_id: skills.find((s) => s.name === "瑜珈").id,
        },
        {
          coach_id: coach1.id, // Ivy
          skill_id: skills.find((s) => s.name === "足球").id,
        },
        {
          coach_id: coach3.id, // Jenni
          skill_id: skills.find((s) => s.name === "皮拉提斯").id,
        },
        {
          coach_id: coach4.id, // Karl
          skill_id: skills.find((s) => s.name === "單車").id,
        },
      ]);

      // 建立 Course_Chapter
      const chaptersData = [
        {
          course_id: course1.id,
          week: "Week 1：基礎認知與呼吸練習",
          days: [
            "Day 1：課程介紹與設定目標",
            "Day 2：呼吸與身體覺察",
            "Day 3：基礎核心啟動",
            "Day 4：肩頸放鬆伸展",
            "Day 5：骨盆調整訓練",
            "Day 6：全身舒展",
            "Day 7：冥想與身心整合",
          ],
        },
        {
          course_id: course1.id,
          week: "Week 2：深層核心與體態重建",
          days: [
            "Day 1：腹式呼吸與核心穩定",
            "Day 2：下背放鬆與強化",
            "Day 3：髖關節活動度提升",
            "Day 4：站姿體態矯正",
            "Day 5：肩胛穩定訓練",
            "Day 6：整合全身動作",
            "Day 7：柔軟度測驗與放鬆",
          ],
        },
        {
          course_id: course1.id,
          week: "Week 3：動作整合與挑戰練習",
          days: [
            "Day 1：高強度核心挑戰",
            "Day 2：動態平衡與控制",
            "Day 3：側腹核心與旋轉控制",
            "Day 4：穩定下肢連動訓練",
            "Day 5：整合式皮拉提斯練習",
            "Day 6：個別問題重點加強",
            "Day 7：成果測驗與回顧",
          ],
        },
      ];
      let course_chapters = [];
      let chapterNumber = 1;
      chaptersData.forEach(({ course_id, week, days }) => {
        days.forEach((subtitle, index) => {
          course_chapters.push({
            course_id,
            title: week,
            subtitle,
            chapter_number: chapterNumber,
            sub_chapter_number: index + 1,
          });
        });
        chapterNumber++;
      });
      await chapterRepo.save(course_chapters);

      // 建立 User_Course_Favorite
      await favoriteRepo.save([
        {
          user_id: user1.id,
          course_id: course1.id,
        },
        {
          user_id: user2.id,
          course_id: course3.id,
        },
      ]);

      // 建立 Rating
      await ratingRepo.save([
        {
          comment: "超棒的課程！老師講解很細",
          score: 4.7,
          user_id: user1.id,
          course_id: course1.id,
        },
        {
          comment: "講戰術的部分收穫很多～",
          score: 4.6,
          user_id: user2.id,
          course_id: course1.id,
        },
      ]);

      // 建立 Subscription 並指定 order_number
      await subscriptionRepo.save([
        {
          user_id: user2.id,
          purchased_at: new Date("2022-07-01"),
          order_number: "ORD20220701001",
          plan_id: plan1.id,
          start_at: new Date("2022-07-01"),
          end_at: new Date("2022-07-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice2.png",
          price: plan1.pricing,
        },
        {
          user_id: user3.id,
          purchased_at: new Date("2023-05-24"),
          order_number: "ORD20230524001",
          plan_id: plan4.id,
          start_at: new Date("2023-05-24"),
          end_at: new Date("2023-05-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice3.png",
          price: plan4.pricing,
        },
        {
          user_id: user3.id,
          purchased_at: new Date("2023-06-01"),
          order_number: "ORD20230601001",
          plan_id: plan2.id,
          start_at: new Date("2023-06-01"),
          end_at: new Date("2023-06-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice3.png",
          price: plan2.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2024-06-01"),
          order_number: "ORD20240601001",
          plan_id: plan3.id,
          start_at: new Date("2024-06-01"),
          end_at: new Date("2024-06-30"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice14.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2024-07-01"),
          order_number: "ORD20240701001",
          plan_id: plan3.id,
          start_at: new Date("2024-07-01"),
          end_at: new Date("2024-07-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice13.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2024-08-01"),
          order_number: "ORD20240801001",
          plan_id: plan3.id,
          start_at: new Date("2024-08-01"),
          end_at: new Date("2024-08-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice12.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2024-09-01"),
          order_number: "ORD20240901001",
          plan_id: plan3.id,
          start_at: new Date("2024-09-01"),
          end_at: new Date("2024-09-30"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice11.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2024-10-01"),
          order_number: "ORD20241001001",
          plan_id: plan3.id,
          start_at: new Date("2024-10-01"),
          end_at: new Date("2024-10-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice10.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2024-11-01"),
          order_number: "ORD20241101001",
          plan_id: plan3.id,
          start_at: new Date("2024-11-01"),
          end_at: new Date("2024-11-30"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice9.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2024-12-01"),
          order_number: "ORD20241201001",
          plan_id: plan3.id,
          start_at: new Date("2024-12-01"),
          end_at: new Date("2024-12-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice8.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2025-01-01"),
          order_number: "ORD20250101001",
          plan_id: plan3.id,
          start_at: new Date("2025-01-01"),
          end_at: new Date("2025-01-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice7.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2025-02-01"),
          order_number: "ORD20250201001",
          plan_id: plan3.id,
          start_at: new Date("2025-02-01"),
          end_at: new Date("2025-02-29"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice6.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2025-03-01"),
          order_number: "ORD20250301001",
          plan_id: plan3.id,
          start_at: new Date("2025-03-01"),
          end_at: new Date("2025-03-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice5.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2025-04-01"),
          order_number: "ORD20250401001",
          plan_id: plan3.id,
          start_at: new Date("2025-04-01"),
          end_at: new Date("2025-04-30"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice4.png",
          price: plan3.pricing,
        },
        {
          user_id: user1.id,
          purchased_at: new Date("2025-05-01"),
          order_number: "ORD20250501001",
          plan_id: plan3.id,
          start_at: new Date("2025-05-01"),
          end_at: new Date("2025-05-31"),
          payment_method: "信用卡",
          invoice_image_url: "https://example.com/invoice1.png",
          price: plan3.pricing,
        },
      ]);
      const subscriptions = await subscriptionRepo.find();

      // 建立 Payment_Transfer（薪資轉帳給教練）
      await paymentRepo.save([
        {
          transfered_at: new Date(),
          amount: 10000,
          is_transfered: true,
          coach_id: coach1.id,
        },
        {
          transfered_at: new Date(),
          amount: 15000,
          is_transfered: false,
          coach_id: coach2.id,
        },
      ]);

      // 建立Subscription_Skill(只會紀錄wellness跟fitness)
      await subscriptionSkillRepo.save([
        // wellness 方案：只訂閱一個 skill
        {
          subscription_id: subscriptions.find((s) => s.order_number === "ORD20220701001").id,
          skill_id: skills.find((s) => s.name === "足球").id,
        },
        // fitness 方案：訂閱三個 skill
        {
          subscription_id: subscriptions.find((s) => s.order_number === "ORD20230601001").id,
          skill_id: skills.find((s) => s.name === "皮拉提斯").id,
        },
        {
          subscription_id: subscriptions.find((s) => s.order_number === "ORD20230601001").id,
          skill_id: skills.find((s) => s.name === "籃球").id,
        },
        {
          subscription_id: subscriptions.find((s) => s.order_number === "ORD20230601001").id,
          skill_id: skills.find((s) => s.name === "登山").id,
        },
      ]);

      console.log("Seed 資料成功匯入");
    } catch (err) {
      console.error("匯入失敗:", err);
    } finally {
      process.exit();
    }
  })
  .catch((err) => {
    console.error("資料庫初始化失敗:", err);
  });
