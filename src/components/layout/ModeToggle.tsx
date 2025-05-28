// "use client"

// import * as React from "react"
// import { Moon, Sun } from "lucide-react"
// // import { useTheme } from "next-themes" // next-themes would need to be installed

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function ModeToggle() {
//   // const { setTheme } = useTheme() // Requires next-themes setup

//   const setTheme = (theme: string) => {
//     // Basic theme toggling if not using next-themes
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     localStorage.setItem('theme', theme);
//   }

//   React.useEffect(() => {
//     // Basic theme persistence if not using next-themes
//     const storedTheme = localStorage.getItem('theme');
//     if (storedTheme) {
//       setTheme(storedTheme);
//     } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       setTheme('dark');
//     } else {
//       setTheme('light');
//     }
//   }, []);


//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => {
//             localStorage.removeItem('theme');
//             if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//                 setTheme('dark');
//             } else {
//                 setTheme('light');
//             }
//         }}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
// NOTE: This component is provided for completeness. To fully enable dark mode switching,
// you would typically use a library like `next-themes` and integrate its provider in `layout.tsx`.
// The current implementation provides basic localStorage-based theme switching.
// You can uncomment its usage in `src/components/layout/Header.tsx` if desired.
// For now, it's commented out as `next-themes` is not part of the default scaffold.
