# Product Specification

## What is this?
A personal daily habit and health metrics tracker. The user logs 
whether they exercised, which supplements were taken, and numeric 
health metrics each day. Designed for at-a-glance daily visibility 
and meaningful reflection over time.

## Who is it for?
A solo user managing their personal health who wants all daily 
tracking in one place. Someone who needs to see at a glance what's 
been done today and what's still outstanding, and who wants to 
reflect on patterns over time through visual data.

## What problem does it solve?
Currently nothing is being tracked. Without a tool, there's no 
visibility on patterns, no way to correlate symptoms with habits, 
and no accountability. This tool creates the habit of tracking by 
making daily logging frictionless.

## Core features (v1 only)
- Daily check-in — tap habits off individually throughout the day
- Today view — home screen showing completion status at a glance
- History view — summary of past days in a list or calendar
- Streak tracking — consecutive days with one missed day grace period
- Charts and visualisation — completion rates and numeric metric trends over 30 days
- Activity heatmap — GitHub-style yearly view of logging activity
- Day notes — free text note attached to any day

## What does success look like?
After 30 days the app is full of data points, visually interesting, 
and easy to reflect on. Daily logging feels frictionless — 
open the app, tap off what's done, close it.

## Explicitly out of scope for v1
- No sharing with other users
- No reminders or notifications
- No integration with wearables or Apple Health
- No social or community features
- No AI analysis of patterns
- No authentication or user accounts
- No mobile app (PWA can come later)

## Monetisation
None — personal tool, free.

## Security considerations
<!--
Note which of these apply to this project:
- Auth (session expiry, token reuse, OAuth edge cases) — N/A
- Multi-tenancy (RLS policies, cross-user data access) — N/A, single user
- Database performance (N+1 queries, missing indexes) — applies
- Billing (Stripe webhooks, failed payments, subscription lifecycle) — N/A
-->