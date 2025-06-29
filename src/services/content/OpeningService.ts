import openingsData from '../../data/openings.json';
import { Opening } from '../../components/openings/OpeningExplorer';

export interface OpeningFilter {
  difficulty: string[];
  themes: string[];
  searchTerm: string;
  ecoRange: string[];
}

class OpeningService {
  private openings: Opening[] = openingsData as Opening[];

  getAllOpenings(): Opening[] {
    return this.openings;
  }

  getFilteredOpenings(filter: OpeningFilter): Opening[] {
    return this.openings.filter(opening => {
      // Search term filter
      if (filter.searchTerm && !this.matchesSearch(opening, filter.searchTerm)) {
        return false;
      }

      // Difficulty filter
      if (filter.difficulty.length > 0 && !filter.difficulty.includes(opening.difficulty)) {
        return false;
      }

      // Theme filter
      if (filter.themes.length > 0 && !filter.themes.some(theme => opening.themes.includes(theme))) {
        return false;
      }

      // ECO range filter
      if (filter.ecoRange.length > 0 && !filter.ecoRange.some(eco => this.isInECORange(opening.eco, eco))) {
        return false;
      }

      return true;
    });
  }

  getOpeningById(id: string): Opening | undefined {
    return this.openings.find(opening => opening.id === id);
  }

  getOpeningsByECO(eco: string): Opening[] {
    return this.openings.filter(opening => this.isInECORange(opening.eco, eco));
  }

  getPopularOpenings(limit: number = 10): Opening[] {
    return this.openings
      .sort((a, b) => b.statistics.totalGames - a.statistics.totalGames)
      .slice(0, limit);
  }

  getOpeningsByDifficulty(difficulty: string): Opening[] {
    return this.openings.filter(opening => opening.difficulty === difficulty);
  }

  getOpeningsByTheme(theme: string): Opening[] {
    return this.openings.filter(opening => opening.themes.includes(theme));
  }

  getAvailableDifficulties(): string[] {
    const difficulties = new Set<string>();
    this.openings.forEach(opening => difficulties.add(opening.difficulty));
    return Array.from(difficulties).sort();
  }

  getAvailableThemes(): string[] {
    const themes = new Set<string>();
    this.openings.forEach(opening => {
      opening.themes.forEach(theme => themes.add(theme));
    });
    return Array.from(themes).sort();
  }

  getAvailableECORanges(): string[] {
    const ecoRanges = new Set<string>();
    this.openings.forEach(opening => {
      const ecoRange = this.getECORange(opening.eco);
      if (ecoRange) ecoRanges.add(ecoRange);
    });
    return Array.from(ecoRanges).sort();
  }

  searchOpenings(query: string): Opening[] {
    const searchTerm = query.toLowerCase();
    return this.openings.filter(opening => this.matchesSearch(opening, searchTerm));
  }

  getRandomOpening(): Opening {
    const randomIndex = Math.floor(Math.random() * this.openings.length);
    return this.openings[randomIndex];
  }

  private matchesSearch(opening: Opening, searchTerm: string): boolean {
    return (
      opening.name.toLowerCase().includes(searchTerm) ||
      opening.description.toLowerCase().includes(searchTerm) ||
      opening.eco.toLowerCase().includes(searchTerm) ||
      opening.themes.some(theme => theme.toLowerCase().includes(searchTerm))
    );
  }

  private isInECORange(openingECO: string, targetECO: string): boolean {
    const openingRange = this.parseECORange(openingECO);
    const targetRange = this.parseECORange(targetECO);
    
    if (!openingRange || !targetRange) return false;
    
    return (
      openingRange.start >= targetRange.start && 
      openingRange.end <= targetRange.end
    );
  }

  private getECORange(eco: string): string | null {
    const match = eco.match(/^([A-E])(\d{2})/);
    if (match) {
      const letter = match[1];
      const number = parseInt(match[2]);
      const start = number - (number % 10);
      const end = start + 9;
      return `${letter}${start.toString().padStart(2, '0')}-${letter}${end}`;
    }
    return null;
  }

  private parseECORange(eco: string): { start: number; end: number } | null {
    const match = eco.match(/^([A-E])(\d{2})-([A-E])(\d{2})$/);
    if (match) {
      const startLetter = match[1];
      const endLetter = match[3];
      if (startLetter === endLetter) {
        const start = parseInt(match[2]);
        const end = parseInt(match[4]);
        return { start, end };
      }
    }
    return null;
  }

  getOpeningStatistics(): {
    totalOpenings: number;
    byDifficulty: Record<string, number>;
    byTheme: Record<string, number>;
    averageGames: number;
  } {
    const byDifficulty: Record<string, number> = {};
    const byTheme: Record<string, number> = {};
    let totalGames = 0;

    this.openings.forEach(opening => {
      // Count by difficulty
      byDifficulty[opening.difficulty] = (byDifficulty[opening.difficulty] || 0) + 1;
      
      // Count by theme
      opening.themes.forEach(theme => {
        byTheme[theme] = (byTheme[theme] || 0) + 1;
      });
      
      totalGames += opening.statistics.totalGames;
    });

    return {
      totalOpenings: this.openings.length,
      byDifficulty,
      byTheme,
      averageGames: Math.round(totalGames / this.openings.length)
    };
  }
}

export default new OpeningService(); 