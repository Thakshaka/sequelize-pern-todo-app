const { createClient } = require('@supabase/supabase-js')
require('dotenv').config();

// get from env

// const supabaseUrl = process.env.SUPABASE_URL
// const supabaseKey = process.env.SUPABASE_KEY

const supabaseUrl = 'https://ugbtaglqcpdjnnfmbmll.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnYnRhZ2xxY3Bkam5uZm1ibWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczOTQzNDgsImV4cCI6MjAzMjk3MDM0OH0.WONEwE9ilYYUptj6mUtItipqmhqXY87mbJ31lHOMEAg'

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase