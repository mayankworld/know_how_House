const express = require('express');
const router = express.Router();
const bookCat = require('../models/bookCat');
const transaction = require('../models/borrowTransaction');
const validateBookCatInput = require('../validation/bookcat');
const bcrypt = require('bcryptjs');

router.post('/borrowTransaction', (req, res, next) => {
    // const { errors, isValid } = validateBookCatInput(req.body);
    // if(!isValid) {
    //     return res.status(400).json(errors);
    // }
    const borrowTransaction = new transaction({
        book_name: req.body.book_name,
        student_name: req.body.student_name,
        date_borrow: req.body.date_borrow,
        date_return: req.body.date_return,
        status: req.body.status
    });
    bcrypt.genSalt(10, (err) => {
        if (err) console.error('There was an error', err);
        else {
            borrowTransaction.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send('Transaction Added successfully')
            })
        }
    });
    // bookCat.findOne({
    //     book_cat: req.body.book_cat
    // }).then(bookcat => {
    //     if(bookcat) {
    //         return res.status(400).json({
    //             book_cat: 'Book Category already exists'
    //         });
    //     }else {
    //         const bookcat = new bookCat({
    //             book_cat: req.body.book_cat,
    //             book_cat_desc: req.body.book_cat_desc
    //         });
    //         bcrypt.genSalt(10, (err) => {
    //             if(err) console.error('There was an error', err);
    //                 else {
    //                     bookcat.save(function (err) {
    //                         if (err) {
    //                             return next(err);
    //                         }
    //                         res.send('Book Category Added successfully')
    //                     })
    //                 }
    //         });
    //     }
    // })
})

router.get('/getTransactions', (req, res) => {

    transaction.find(req.params, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.get('/editTransaction/:id', (req, res, next) => {
    transaction.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
});

router.get('/viewTransactionDetail/:id', (req, res, next) => {
    transaction.findById(req.params.id, function (err, result) {
        if (err) return next(err);
        res.send(result);
    })
})

router.put('/updateTransaction/:id', (req, res, next) => {
    transaction.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
        if (err) return next(err);
        res.send('Book updated.');
    });
})


router.delete('/deleteTransaction/:id', (req, res, next) => {
    transaction.findByIdAndDelete({ _id: req.params.id }, function (err) {
        if (err) return next(err);
        res.send("Deleted Successfully!!");
    })
})

module.exports = router;