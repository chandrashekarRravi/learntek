import { Faculty } from "@/types/faculty.types";
import { mockFaculties } from "@/data/mockData";

class FacultyService {
  private faculties: Faculty[] = [...mockFaculties];

  getAllFaculties(): Faculty[] {
    return this.faculties;
  }

  getFacultyById(id: string): Faculty | undefined {
    return this.faculties.find((f) => f.id === id);
  }

  createFaculty(faculty: Omit<Faculty, "id">): Faculty {
    const newId = `FAC${(this.faculties.length + 101).toString()}`;
    const newFaculty: Faculty = {
      ...faculty,
      id: newId,
    };
    this.faculties.push(newFaculty);
    return newFaculty;
  }

  updateFaculty(id: string, updates: Partial<Faculty>): Faculty | undefined {
    const index = this.faculties.findIndex((f) => f.id === id);
    if (index !== -1) {
      this.faculties[index] = { ...this.faculties[index], ...updates };
      return this.faculties[index];
    }
    return undefined;
  }

  deleteFaculty(id: string): boolean {
    const index = this.faculties.findIndex((f) => f.id === id);
    if (index !== -1) {
      this.faculties.splice(index, 1);
      return true;
    }
    return false;
  }

  searchFaculties(query: string, subjects: string[]): Faculty[] {
    return this.faculties.filter((faculty) => {
      const matchesQuery =
        query === "" ||
        faculty.firstName.toLowerCase().includes(query.toLowerCase()) ||
        (faculty.lastName?.toLowerCase() || "").includes(query.toLowerCase());

      const matchesSubject =
        subjects.length === 0 || subjects.includes(faculty.subject);

      return matchesQuery && matchesSubject;
    });
  }
}

export const facultyService = new FacultyService();
