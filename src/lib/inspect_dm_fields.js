const fs = require('fs');
const schema = JSON.parse(fs.readFileSync('/Users/tusharmangla/.gemini/antigravity-ide/brain/7fd179e7-6a4d-4e79-aa6a-eb6439f0c1fa/scratch/resolved_people_search.json', 'utf8'));

const contactProps = schema.properties.contact.allOf[0].properties;

console.log("=== RAW SENIORITY OBJECT ===");
console.log(JSON.stringify(contactProps.seniority, null, 2));
