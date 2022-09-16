const combinedObjects = [
  {
    _id: 0,
    name: "David",
    surname: "Smith",
    slug: "david-smith",
    category: "operations",
    title: "Head of Development",
    reportsTo: "bruce-davids",
  },
  {
    _id: 1,
    name: "John",
    surname: "Jones",
    slug: "john-jones",
    category: "operations",
    title: "Head of Marketing",
    reportsTo: "bruce-davids",
  },
  {
    _id: 2,
    name: "Jane",
    surname: "Sampson",
    slug: "jane-sampson",
    category: "operations",
    title: "Head of Content",
    reportsTo: "bruce-davids",
  },
  {
    _id: 3,
    name: "Nick",
    surname: "Thompson",
    slug: "nick-thompson",
    category: "operations",
    title: "Head of Design",
    reportsTo: "terry-cats",
  },
  {
    _id: 4,
    name: "Nick",
    surname: "Jenson",
    slug: "nick-jenson",
    category: "interns",
    title: "Intern designer",
    reportsTo: "nick-thompson",
  },
  {
    _id: 5,
    name: "Simon",
    surname: "Says",
    slug: "simon-says",
    category: "operations",
    title: "Head of Strategy",
    reportsTo: "bruce-davids",
  },
  {
    _id: 6,
    name: "Terry",
    surname: "Cats",
    slug: "terry-cats",
    category: "c-suite",
    title: "Chief Creative Officer",
    reportsTo: "",
  },
  {
    _id: 7,
    name: "Bruce",
    surname: "Davids",
    slug: "bruce-davids",
    category: "c-suite",
    title: "Chief Strategy Officer",
    reportsTo: "",
  },
  {
    _id: 8,
    name: "Bill",
    surname: "Bass",
    slug: "bill-bass",
    category: "c-suite",
    title: "Chief Executive Officer",
    reportsTo: "",
  },
];

const categories = [
  {
    _id: 0,
    name: "Executive",
    parent: "",
    slug: "c-suite",
  },
  {
    _id: 1,
    name: "Operations",
    parent: "c-suite",
    slug: "operations",
  },
  {
    _id: 2,
    name: "Interns",
    parent: "operations",
    slug: "interns",
  },
];

// Review the instructions to complete this assessment
// console.info("Your application must have the following output:\n");
// console.info(
//   "* Terry Cats - Chief Creative Officer: Executive\n\t* Nick Thompson - Head of Design: Operations\n\t\t * Nick Jenson - Intern designer: Interns\n* Bruce Davids - Chief Strategy Officer: Executive\n\t* David Smith - Head of Development: Operations\n\t* John Jones - Head of Marketing: Operations\n\t* Jane Sampson - Head of Content: Operations\n\t* Simon Says - Head of Strategy: Operations\n* Bill Bass - Chief Executive Officer: Executive"
// );

// Start your code here but please comment out the above logs
function combineStructures() {
  const combined = [];
  combinedObjects.forEach((staffMember) => {
    const category = categories.find(
      (category) => category.slug === staffMember.category
    );
    combined.push({
      ...staffMember,
      category: category.name,
    });
  });
  return combined;
}

function createHierarchy(StaffMembersCategory) {
  const hierarchy = [];

  function addStaffMemberToHierarchy(staffMember) {
    const staffMemberObject = {
      _id: staffMember._id,
      name: staffMember.name,
      surname: staffMember.surname,
      slug: staffMember.slug,
      category: staffMember.category,
      title: staffMember.title,
      reportsTo: staffMember.reportsTo,
      children: [],
    };

    const children = StaffMembersCategory.filter(
      (staffMember) => staffMember.reportsTo === staffMemberObject.slug
    );

    if (children.length > 0) {
      children.forEach((child) => {
        staffMemberObject.children.push(addStaffMemberToHierarchy(child));
      });
    }

    return staffMemberObject;
  }

  StaffMembersCategory.forEach((staffMember) => {
    if (staffMember.reportsTo === "") {
      hierarchy.push(addStaffMemberToHierarchy(staffMember));
    }
  });
  return hierarchy;
}

function formattedOutput(hierarchy) {
  let output = "";

  function displayStaffMember(staffMember, level) {
    const indentation = "\t".repeat(level);
    output += `${indentation}* ${staffMember.name} ${staffMember.surname} - ${staffMember.title}: ${staffMember.category}\n`;
    staffMember.children.forEach((child) => {
      displayStaffMember(child, level + 1);
    });
  }

  hierarchy.forEach((staffMember) => {
    displayStaffMember(staffMember, 0);
  });

  return output;
}

let StaffMembersCategory = combineStructures();
let hierarchy = createHierarchy(StaffMembersCategory);
console.info(formattedOutput(hierarchy));
