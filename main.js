const staffMembers = [
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

// create a function that will create a tree structure from the staffMembers array and the categories array
// this will be based on reportsTo and parent properties

function tree() {
  // create a new array that will hold the tree structure
  const tree = [];

  // create a function that will recursively add the staff members to the tree
  function addStaffMemberToTree(staffMember) {
    // create a new object that will hold the staff member details
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

    // check if the staff member has any children
    const children = staffMembers.filter(
      (staffMember) => staffMember.reportsTo === staffMemberObject.slug
    );

    // if the staff member has children, add them to the tree
    if (children.length > 0) {
      children.forEach((child) => {
        staffMemberObject.children.push(addStaffMemberToTree(child));
      });
    }

    // return the staff member object
    return staffMemberObject;
  }

  // add the staff members to the tree
  staffMembers.forEach((staffMember) => {
    // check if the staff member has a parent
    if (staffMember.reportsTo === "") {
      // add the staff member to the tree
      tree.push(addStaffMemberToTree(staffMember));
    }
  });

  // return the tree
  return tree;
}

console.log(tree());
