import { useEffect, useRef, useState } from "react";
import IconButtonWrapper from "../icon-button-wrapper/icon-button-wrapper";
import Icons from "../icons";
import { Month, Teams } from "../../shared/enums";
import useMediaQuery from "../../shared/hooks/use-media-query/use-media-query";

type DropdownProps<T extends string | number> = {
  options: T[];
  defaultValue: T;
  onSelect: (selectedValue: T) => void;
  extendedClassNames: string;
  title: string;
};

function Dropdown<T extends string | number>({
  options,
  defaultValue,
  onSelect,
  extendedClassNames
}: // title = "Select Address"
DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: T) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const getOptionLabel = (option: T): string => {
    if (typeof option === "number") {
      return Month[option] || Teams[option];
    } else {
      return String(option);
    }
  };
  const media425 = useMediaQuery({ screen: "425px", type: "min" });

  return (
    <div
      className={`${extendedClassNames}`}
      ref={dropdownRef}
      onClick={toggleDropdown}
    >
      <div className="cursor-pointer px-3 py-2 border border-green-600 transition-colors duration-200 ease-in-out capitalize rounded-lg flex items-center justify-center space-x-1 ss:space-x-4 hover:text-green-600">
        <span className=" text-xs ss:text-sm">
          {getOptionLabel(selectedOption)}
        </span>
        <IconButtonWrapper extendedClassNames={` `}>
          <Icons.IconDrop isDropdown={!isOpen} size={media425 ? 24 : 16} />
        </IconButtonWrapper>
      </div>

      {isOpen && (
        <ul className="min-w-full w-[max-content] flex items-stretch flex-col place-self-center space-y-2 p-4 border bg-green-300 border-green-400 capitalize rounded-lg my-4 z-50 divide-y divide-green-500 absolute">
          {options.map((option) => (
            <li
              key={String(option)}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer hover:text-green-600 pt-2 first:pt-0"
            >
              {getOptionLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

// import { useEffect, useRef, useState } from "react";

// import IconButtonWrapper from "../icon-button-wrapper/icon-button-wrapper";
// import Icons from "../icons";

// // import { FaHome } from "react-icons/fa";
// // import IconButtonWrapper from "../icon-button-wrapper/icon-button-wrapper";
// // import Icons from "../icons";

// type DropDownProps = {
//   options: string[];
//   defaultValue: string;
//   onSelect: (arg: string) => void;
//   extendedClassNames: string;
//   title: string;
// };
// function Dropdown({
//   options,
//   defaultValue,
//   onSelect,
//   extendedClassNames,
//   title = "Select Address"
// }: DropDownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(defaultValue);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // Add an event listener to close the dropdown when a click occurs outside of it
//     // const handleOutsideClick = (event) => {
//     //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//     //     setIsOpen(false);
//     //   }
//     // };
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("click", handleOutsideClick);

//     return () => {
//       document.removeEventListener("click", handleOutsideClick);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option: string) => {
//     setSelectedOption(option);
//     onSelect(option);
//     setIsOpen(false);
//   };

//   return (
//     <div
//       className={`${extendedClassNames}`}
//       ref={dropdownRef}
//       onClick={toggleDropdown}
//     >
//       <div className=" cursor-pointer  p-4 border border-gray-600 transition-colors duration-200 ease-in-out capitalize  rounded-lg flex items-center justify-center space-x-4 hover:text-gray-600">
//         <span>{selectedOption || defaultValue || title}</span>
//         <IconButtonWrapper extendedClassNames={` `}>
//           <Icons.IconDrop isDropdown={!isOpen} />
//         </IconButtonWrapper>
//       </div>

//       {isOpen && (
//         <ul className=" min-w-full w-[max-content] flex items-stretch flex-col place-self-center space-y-3  p-4 border bg-gray-400  border-gray-600 capitalize  rounded-lg my-4 z-50 divide-y divide-gray-600 absolute">
//           {options.map((option) => (
//             <li
//               key={option}
//               onClick={() => handleOptionClick(option)}
//               className=" cursor-pointer hover:text-gray-600 pt-3 first:pt-0 "
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Dropdown;
