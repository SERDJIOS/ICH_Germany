export namespace UserManagement {
  export namespace Admin {
    export class AdminUser {
      name: string;
      email: string;
      isSuperAdmin: boolean;

      constructor(name: string, email: string, isSuperAdmin: boolean = false) {
        this.name = name;
        this.email = email;
        this.isSuperAdmin = isSuperAdmin;
      }

      setSuperAdmin(isSuperAdmin: boolean): void {
        this.isSuperAdmin = isSuperAdmin;
      }

      getPermissions(): string {
        return `User: ${this.name}, Email: ${this.email}, Super Admin: ${this.isSuperAdmin}`;
      }
    }
  }
} 