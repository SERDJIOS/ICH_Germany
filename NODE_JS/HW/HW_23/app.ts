// Общая утилита-задержка
const delay = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));
  
  /* ─────────────────────  Задание 1  ───────────────────── */
  
  async function promise1(): Promise<string> {
    await delay(1_000);
    console.log("Промис 1 выполнен");
    return "Результат 1";
  }
  async function promise2(): Promise<string> {
    await delay(500);
    console.log("Промис 2 выполнен");
    return "Результат 2";
  }
  async function promise3(): Promise<string> {
    await delay(1_500);
    console.log("Промис 3 выполнен");
    return "Результат 3";
  }
  
  async function sequentialExecution(): Promise<void> {
    console.log("\n— Задание 1 — начало —");
    console.log(await promise1());
    console.log(await promise2());
    console.log(await promise3());
    console.log("— Задание 1 — готово —");
  }
  
  /* ─────────────────────  Задание 2  ───────────────────── */
  
  async function processString(str: string): Promise<string> {
    await delay(Math.random() * 1_000 + 500);
    return str.toUpperCase();
  }
  
  async function processArrayParallel(arr: string[]): Promise<void> {
    console.log("\n— Задание 2 — начало —");
    try {
      const results = await Promise.all(arr.map(processString));
      console.log("Результаты:", results);
    } catch (e) {
      console.error("Ошибка при обработке массива:", e);
    }
    console.log("— Задание 2 — готово —");
  }
  
  /* ─────────────────────  Задание 3  ───────────────────── */
  
  async function parallelWithRejection(): Promise<void> {
    console.log("\n— Задание 3 — начало —");
    const p1 = new Promise<string>(r => setTimeout(() => r("Успех 1"), 500));
    const p2 = new Promise<string>((_, rej) =>
      setTimeout(() => rej(new Error("Ошибка во втором промисе!")), 1_000),
    );
    const p3 = new Promise<string>(r => setTimeout(() => r("Успех 3"), 1_500));
  
    try {
      await Promise.all([p1, p2, p3]);
      // до этого места код не дойдёт, т.к. p2 отклонится
    } catch (e) {
      console.error("Поймано в catch:", e);
    }
    console.log("— Задание 3 — готово —");
  }
  
  /* ─────────────────────  Задание 4  ───────────────────── */
  
  async function dynamicDelayPromise(ms: number): Promise<string> {
    await delay(ms);
    console.log(`Промис с задержкой ${ms} мс выполнен`);
    return `Результат для ${ms}`;
  }
  
  async function dynamicExecution(arr: number[]): Promise<void> {
    console.log("\n— Задание 4 — начало —");
    try {
      const results = await Promise.all(arr.map(dynamicDelayPromise));
      console.log("Результаты:", results);
    } catch (e) {
      console.error("Ошибка в задании 4:", e);
    }
    console.log("— Задание 4 — готово —");
  }
  
  /* ─────────────────────  Точка входа  ───────────────────── */
  
  async function main(): Promise<void> {
    await sequentialExecution();
    await processArrayParallel(["строка 1", "строка 2", "ещё одна строка", "последняя"]);
    await parallelWithRejection();
    await dynamicExecution([1_200, 800, 2_000, 300, 1_500]);
    console.log("\n✔︎ Все задания выполнены.");
  }
  
  main().catch(console.error);