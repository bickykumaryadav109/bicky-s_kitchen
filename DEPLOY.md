# How to Deploy "Bicky's Kitchen" to Vercel

Since this is a Next.js application with API routes, **Vercel** is the best place to host it. It is free for personal use and setup is automatic.

## Prerequisites
- You have a [GitHub account](https://github.com).
- You have pushed your code to GitHub (which you have already done!).

## Steps to Deploy

1. **Sign Up / Log In to Vercel**
   - Go to [vercel.com](https://vercel.com/signup).
   - Choose **"Continue with GitHub"**.

2. **Import Project**
   - On your Vercel dashboard, click **"Add New..."** button (usually top right) -> Select **"Project"**.
   - You will see a list of your GitHub repositories.
   - Find `bicky-s_kitchen` and click **"Import"**.

3. **Configure Project**
   - **Project Name**: Leave as `bicky-s_kitchen` (or change if you want).
   - **Framework Preset**: It should automatically say `Next.js`.
   - **Root Directory**: Leave as `./`.
   - **Environment Variables**: You don't need any for this version.

4. **Deploy**
   - Click the big **"Deploy"** button.
   - Wait about 1-2 minutes. Vercel will build your site.

5. **Done!**
   - Once finished, you will see a "Congratulations!" screen.
   - Click the **screenshot of your website** to visit your live URL.
   - It will look something like: `https://bicky-s-kitchen.vercel.app`.

## Future Updates
- Whenever you make changes and run `git push origin main`, Vercel will **automatically** re-deploy your site with the changes!
