import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';
import axios from 'axios';
import { submitComplaints, getAllComplaints, updatePolicyByAdmin, addPolicyComment, getPolicyComments } from './Complaints.js';
// import { UserSignUp } from './user.js';

dotenv.config();
const PORT = 3000;
const app = express();
const sql = neon(process.env.DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({
  origin : '*'
}));

app.get('/api/states', async (req, res) => {
    try {
      const response = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
      res.json(response.data);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Failed to fetch states' });
    }
  });

app.post('/submit-complaint',(req,res) => submitComplaints(req,res,sql));
app.get('/all-complaints',(req,res) => getAllComplaints(req,res,sql));
app.put('/update-policy' , (req,res) => updatePolicyByAdmin(req,res,sql));  // Changed from POST to PUT

// Add new routes
app.post('/policy-comment', (req, res) => addPolicyComment(req, res, sql));
app.get('/policy-comments/:policyId', (req, res) => getPolicyComments(req, res, sql));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT,()=>{
    console.log('Server is ready!');
});