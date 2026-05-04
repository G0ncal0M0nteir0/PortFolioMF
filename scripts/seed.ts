import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { works } from "../app/data/works";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log("🗑️  Deleting existing works...");
  const { error: deleteError } = await supabase
    .from("Work")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    console.error("Error deleting:", deleteError);
    process.exit(1);
  }

  console.log("🌱 Inserting works from works.ts...");
  const { error: insertError } = await supabase
    .from("Work")
    .insert(works);

  if (insertError) {
    console.error("Error inserting:", insertError);
    process.exit(1);
  }

  console.log("✅ Done! Inserted", works.length, "works.");
}

seed();