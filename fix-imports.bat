@echo off
echo Fixing imports in dashboard pages...

:: Add import to analytics page if not present
findstr /C:"DashboardLayout" app\dashboard\analytics\page.tsx > nul
if errorlevel 1 (
  echo Adding import to analytics page...
  echo import { DashboardLayout } from "@/components/layout/DashboardLayout"; > temp.txt
  type app\dashboard\analytics\page.tsx >> temp.txt
  move temp.txt app\dashboard\analytics\page.tsx
)

:: Add import to settings page if not present
findstr /C:"DashboardLayout" app\dashboard\settings\page.tsx > nul
if errorlevel 1 (
  echo Adding import to settings page...
  echo import { DashboardLayout } from "@/components/layout/DashboardLayout"; > temp.txt
  type app\dashboard\settings\page.tsx >> temp.txt
  move temp.txt app\dashboard\settings\page.tsx
)

:: Add import to territory page if not present
findstr /C:"DashboardLayout" app\dashboard\territory\page.tsx > nul
if errorlevel 1 (
  echo Adding import to territory page...
  echo import { DashboardLayout } from "@/components/layout/DashboardLayout"; > temp.txt
  type app\dashboard\territory\page.tsx >> temp.txt
  move temp.txt app\dashboard\territory\page.tsx
)

echo Done! Run npm run build again.