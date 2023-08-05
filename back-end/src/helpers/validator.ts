type ErrorMessage = { message: string };

class Validator {
  static async validateInput(name: string | string[], value: any | any[]) {
    if (typeof name === "string") {
      if (!value) throw { message: `${name} is required`, name: "BAD_REQUEST" };
    } else {
      const errors: string[] = [];
      name.forEach((el, index) => {
        if (!value[index]) errors.push(`${el} is required`);
      });

      if (errors.length !== 0)
        throw { message: errors.join(", "), name: "BAD_REQUEST" };
    }
  }

  static validatePassword(password: string) {
    if (!password) throw { name: "BAD_REQUEST", message: "Invalid password" };
  }

  static validateToken(value: any) {
    if (!value) throw { name: "INVALID_TOKEN", message: "Access denied" };
  }

  static validateAuthor(value: any) {
    if (!value) throw { name: "UNAUTHORIZED", message: "Forbidden" };
  }

  static async validateInputRequest(data: object) {
    const array: ErrorMessage[] = [];
    let i = 0;
    for (const key in data) {
      let errorMessage: ErrorMessage = { message: "" };
      switch (key) {
        case "password":
          if (data[key].length < 5) {
            errorMessage.message = "Password atleast 5 char";
            array.push(errorMessage);
          }
          break;
        case "email":
          if (!data[key].includes("@")) {
            errorMessage.message = "Invalid Email Format";
            array.push(errorMessage);
          }
          break;
        case "username":
          if (data[key].length < 5) {
            errorMessage.message = "Username atleast 5 char";
            array.push(errorMessage);
          }
          break;
      }
    }

    if (array.length !== 0) {
      const errorMessage = array.map((error) => error.message).join(", ");
      throw { message: errorMessage, name: "BAD_REQUEST" };
    }
  }
}

export default Validator;
