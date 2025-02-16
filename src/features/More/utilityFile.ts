//Member Shape
interface Member {
  id: number;
  name: string;
  linkId: number | null;
}

//Method to find Members to be billed and their children
//takes array of Members as INPUT
//returns object with BILLED MEMBERS and CHILDREN array
export function findBilledMembers(membersArray: Member[]): {
  billedMembers: Member[];
  children: { [key: number]: Member[] };
  groupsInfo: string[];
} {
  const billedMembers: Member[] = [];
  const children: { [key: number]: Member[] } = {};
  const alreadyCheckedMembers: number[] = []; //keeps track of list of members already checked for circular reference
  const circularGroupsFound: number[] = []; //keeps track of list of circular groups found
  const groupsInfo: string[] = [];

  //to check if there is a circular reference
  function hasCircularLink(memberId: number): boolean {
    // console.log("circularGroupsFound:", circularGroupsFound, "alreadyCheckedMembers:", alreadyCheckedMembers, "MemberId:", memberId);

    if (circularGroupsFound.includes(memberId)) {
      //circular reference detected - if circularGroupsFound has the member id, it means it is already checked and found Circular
      return true;
    }

    if (alreadyCheckedMembers.includes(memberId)) {
      return false;
    }

    alreadyCheckedMembers.push(memberId);
    circularGroupsFound.push(memberId);

    const member = membersArray.find((m) => m.id === memberId);

    if (member && member.linkId !== null) {
      //   console.log(
      //     "Checking circular depdc of ",
      //     member,
      //     "'s child ",
      //     member.linkId
      //   );

      if (hasCircularLink(member.linkId)) {
        //circular reference detected
        return true;
      }
    }

    // Remove the member from the circularGroupsFound - getting rid of repetition
    circularGroupsFound.pop();

    //no circular reference
    return false;
  }

  membersArray.forEach((member) => {
    if (member.linkId === null) {
      // Parent Member - if no links to it, it is a BILLED MEMBER
      billedMembers.push(member);
      // setting the CHILDREN to empty array for the parent with null linkId
      children[member.id] = [];
    } else {
      // Child Member - if there is a link to it, it is not a BILLED MEMBER

      //finding Child Member
      const parent = membersArray.find((m) => m.id === member.linkId);

      if (parent) {
        if (!children[parent.id]) {
          children[parent.id] = [];
        }

        children[parent.id].push(member);
      }
    }
  });
  //   console.warn("Children Array:", children);

  // Detect circular Linkages
  console.log("\n\n---------------------------------------------");

  membersArray.forEach((member) => {
    if (hasCircularLink(member.id)) {
      console.error(`     Circular Link detected for member ${member.id}`);
      groupsInfo.push(`     Circular Link detected for member ${member.id}`);
    }
  });
  console.log("---------------------------------------------");

  return { billedMembers, children, groupsInfo };
}

// Members Array
export let membersArray: Member[] = [
  {
    id: 1,
    name: "member A",
    linkId: 3,
  },
  {
    id: 2,
    name: "member B",
    linkId: 1,
  },
  {
    id: 3,
    name: "member C",
    linkId: 2,
  },
  {
    id: 4,
    name: "member D",
    linkId: null,
  },
  {
    id: 5,
    name: "member E",
    linkId: null,
  },
  {
    id: 6,
    name: "member F",
    linkId: 1,
  },
  {
    id: 7,
    name: "member G",
    linkId: 9,
  },
  {
    id: 8,
    name: "member H",
    linkId: 9,
  },
  {
    id: 9,
    name: "member I",
    linkId: null,
  },
  {
    id: 10,
    name: "member J",
    linkId: 10,
  },
  {
    id: 11,
    name: "member K",
    linkId: null,
  },
];

console.log("\nMEMBERS ARRAY:\n", membersArray);

//Finding Billed Members and their Children
console.log("\n\n------------------FINDINGS----------------------");

export const findings = findBilledMembers(membersArray);

console.log("\nBILLED MEMBER(S):\n", findings.billedMembers);

console.log("CHILDREN:", findings.children);

Object.keys(findings.children).forEach((key) => {
  if (findings.children[Number(key)].length)
    console.error(
      `\n${
        membersArray.find((m) => m.id == Number(key))?.name
      } has the following Parents:`,
      findings.children[Number(key)].map((Parent) => `${Parent.name}`)
    );
});
