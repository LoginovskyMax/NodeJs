
    // sum.test.ts (файл с юнит-тестами)
    import { sum, sumHard, sumWithFetch } from './sum';

    // Функция test() принимает два аргумента:
    // 1. Строку с описанием теста (что именно мы проверяем)
    // 2. Функцию-колбэк, в которой содержится сам тест
    describe('Проверка sum с разными значениями', ()=>{
        let a = 0

        beforeEach(()=>{
           a++
        })
        beforeAll(()=>{

        })
        it('adds 1 + 2 to equal 3',  () => {
            // Проверяем: результат вызова sum(1, 2) должен быть равен 3
            expect(sum(a,2)).toBe(3);
            });
        it('adds 0 + 0 to equal 0', () => {
                // Проверяем, что sum(0, 0) возвращает 0
                expect(sum(a,0)).toBe(2);
            });
        it('adds -1 + 5 to equal 4', () => {
                // Проверяем, что sum(-1, 5) возвращает 4
                expect(sum(a,5)).toBe(8);
            })
        afterEach(()=>{

            })
    })
 

    test("mock implementation", () => {
        const mockFn = jest.fn(() => 3);

        expect(sumHard(1,2,mockFn)).toBe(6);
        // expect(sumHard).toHaveBeenCalled();
      });

    test("Проверка функции с запросом на сервер", async () => {
        const answer = await sumWithFetch(1,2)
        expect(answer).toBe(6);
        // expect(sumHard).toHaveBeenCalled();
      });

    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(3),
        }),
      ) as jest.Mock;