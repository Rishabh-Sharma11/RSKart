import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';


dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product => {

            //return an object with all of the stuff that's in the product already, so I used spread 
            //operator (...), which will spread all the data that's already there. In addition to that
            //I want to add to the user field, the adminUser that I pulled above.
            //So, it's just going to be the products, but with the addition of the user of the adminUser.
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);    //exit with failure, so passed 1.
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);    //exit with failure, so passed 1.
    }
}

if(process.argv[2] == '-d'){
    destroyData();
}else{
    importData();
}

// no need of below instructions as these have been added to scripts in package.json
// To destroy data, call it as -> node backend/seeder -d
//To import data, call it as -> node backend/seeder