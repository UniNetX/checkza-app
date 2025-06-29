export class IndexedDBService {
  private dbName = 'CheckzaDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        if (!db.objectStoreNames.contains('lessonProgress')) {
          db.createObjectStore('lessonProgress', { keyPath: 'lessonId' });
        }

        if (!db.objectStoreNames.contains('gameHistory')) {
          db.createObjectStore('gameHistory', { keyPath: 'id', autoIncrement: true });
        }

        if (!db.objectStoreNames.contains('puzzleProgress')) {
          db.createObjectStore('puzzleProgress', { keyPath: 'puzzleId' });
        }
      };
    });
  }

  async saveLessonProgress(lessonId: string, progress: number): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['lessonProgress'], 'readwrite');
      const store = transaction.objectStore('lessonProgress');
      
      const request = store.put({
        lessonId,
        progress,
        timestamp: Date.now()
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getLessonProgress(lessonId: string): Promise<number> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['lessonProgress'], 'readonly');
      const store = transaction.objectStore('lessonProgress');
      
      const request = store.get(lessonId);

      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.progress : 0);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async saveGameHistory(gameData: any): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['gameHistory'], 'readwrite');
      const store = transaction.objectStore('gameHistory');
      
      const request = store.add({
        ...gameData,
        timestamp: Date.now()
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getGameHistory(): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['gameHistory'], 'readonly');
      const store = transaction.objectStore('gameHistory');
      
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async savePuzzleProgress(puzzleId: string, solved: boolean): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['puzzleProgress'], 'readwrite');
      const store = transaction.objectStore('puzzleProgress');
      
      const request = store.put({
        puzzleId,
        solved,
        timestamp: Date.now()
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getPuzzleProgress(puzzleId: string): Promise<boolean> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['puzzleProgress'], 'readonly');
      const store = transaction.objectStore('puzzleProgress');
      
      const request = store.get(puzzleId);

      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.solved : false);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async clearAllData(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        ['lessonProgress', 'gameHistory', 'puzzleProgress'], 
        'readwrite'
      );

      const stores = ['lessonProgress', 'gameHistory', 'puzzleProgress'];
      let completed = 0;

      stores.forEach(storeName => {
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        
        request.onsuccess = () => {
          completed++;
          if (completed === stores.length) resolve();
        };
        request.onerror = () => reject(request.error);
      });
    });
  }
} 