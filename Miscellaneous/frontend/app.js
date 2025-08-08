
class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hi, i am ${this.name}`);
    }
}

class Student extends Person{
      constructor(name, age, marks){
        super(name, age);
        this.marks = marks;
    }
}

class Teacher extends Person{
      constructor(name, age, marks){
        super(name, age);
        this.marks = marks;
    }
}

let stu1 = new Student("Zaib", 19, 96);
let stu2 = new Student("V", 23, 85);
