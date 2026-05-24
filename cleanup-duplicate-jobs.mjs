// One-time script to remove duplicate jobs (same customer + same date, keep oldest)
// Run with: node cleanup-duplicate-jobs.mjs

import { initializeApp } from './gd-website-standalone/node_modules/firebase/app/dist/index.mjs';
import { getFirestore, collection, getDocs, deleteDoc, doc } from './gd-website-standalone/node_modules/firebase/firestore/dist/index.mjs';

const firebaseConfig = {
  apiKey: "AIzaSyCXyGHhZ_GkqHDj-7hodHfC9RcQMi9pmIw",
  authDomain: "gd-admin-e57b1.firebaseapp.com",
  projectId: "gd-admin-e57b1",
  storageBucket: "gd-admin-e57b1.firebasestorage.app",
  messagingSenderId: "384950998335",
  appId: "1:384950998335:web:bc4c4efd94a77c300faf8a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanupDuplicates() {
  console.log('Fetching all jobs...');
  const snapshot = await getDocs(collection(db, 'jobs'));

  const jobs = snapshot.docs.map(d => ({
    id: d.id,
    ...d.data(),
    _createdAt: d.data().createdAt?.toMillis?.() || 0
  }));

  console.log(`Total jobs: ${jobs.length}`);

  // Group by customerName + scheduledDate (or date)
  const groups = {};
  for (const job of jobs) {
    const date = job.scheduledDate || job.date || 'unknown';
    const name = (job.customerName || 'unknown').toLowerCase().trim();
    const key = `${name}||${date}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(job);
  }

  // Find groups with duplicates
  const duplicateGroups = Object.entries(groups).filter(([, g]) => g.length > 1);
  console.log(`Found ${duplicateGroups.length} date+customer combos with duplicates\n`);

  if (duplicateGroups.length === 0) {
    console.log('No duplicates found — all clean!');
    process.exit(0);
  }

  let totalDeleted = 0;

  for (const [key, group] of duplicateGroups) {
    const [name, date] = key.split('||');

    // Sort: keep the oldest (lowest createdAt). If createdAt is missing, keep the first doc.
    group.sort((a, b) => a._createdAt - b._createdAt);

    const keep = group[0];
    const toDelete = group.slice(1);

    console.log(`Customer: "${name}"  Date: ${date}`);
    console.log(`  Keeping:  ${keep.id} (${keep.serviceType || 'job'})`);

    for (const dup of toDelete) {
      console.log(`  Deleting: ${dup.id} (${dup.serviceType || 'job'}, parentId: ${dup.parentRecurringJobId || 'none'})`);
      await deleteDoc(doc(db, 'jobs', dup.id));
      totalDeleted++;
    }
    console.log('');
  }

  console.log(`Done. Deleted ${totalDeleted} duplicate job(s).`);
  process.exit(0);
}

cleanupDuplicates().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
