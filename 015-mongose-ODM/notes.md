Mongose
collection is Model
documents is Object

<!--  -->

You Should write `mongoose.disconnect()` within callback of operations of database
not in callback of middleware, because in this case will throw an error Pool Destroyed or attempt access closed database.
