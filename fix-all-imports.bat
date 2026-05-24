@echo off
echo Fixing all dashboard page imports...

:: Fix analytics page
echo import { DashboardLayout } from "@/components/layout/DashboardLayout"; > temp.txt
echo. >> temp.txt
type app\dashboard\analytics\page.tsx >> temp.txt
move temp.txt app\dashboard\analytics\page.tsx

:: Fix settings page
echo import { DashboardLayout } from "@/components/layout/DashboardLayout"; > temp.txt
echo. >> temp.txt
type app\dashboard\settings\page.tsx >> temp.txt
move temp.txt app\dashboard\settings\page.tsx

:: Fix territory page
echo import { DashboardLayout } from "@/components/layout/DashboardLayout"; > temp.txt
echo. >> temp.txt
type app\dashboard\territory\page.tsx >> temp.txt
move temp.txt app\dashboard\territory\page.tsx

echo All imports added successfully!
echo Run npm run build again.