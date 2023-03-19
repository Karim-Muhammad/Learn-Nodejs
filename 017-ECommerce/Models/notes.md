In Mongoose, the `strict` and `strictQuery` options control the schema enforcement behavior for documents and queries respectively.

The `strict` option is a schema option that controls whether Mongoose should apply strict mode to the document or not. When `strict` is set to `true`, __Mongoose__ will only save fields that are defined in the schema. Any other field that is not defined in the schema will be ignored and not saved to the database. _By default_, `strict` is set to `true`.

On the other hand, the `strictQuery` option is a query option that controls whether Mongoose should apply strict mode to the query or not. When `strictQuery` is set to `true`, Mongoose will only match documents that have fields that are defined in the schema. Any document that has a field that is not defined in the schema will not be matched. _By default_, `strictQuery` is set to `false`.

In summary, `strict` _controls the schema enforcement behavior for documents_, while `strictQuery` _controls the schema enforcement behavior for queries_.


In Mongoose 7, `strictQuery` is `false` _by default_. However, you can override this behavior globally:

```js
// Set `strictQuery` to `true` to omit unknown fields in queries.
mongoose.set('strictQuery', true);
```

instead of setting `strictQuery` to `true` for each query, like that

```js
// Set `strictQuery` to `true` to omit unknown fields in queries.
Model.find({ name: 'John' }, null, { strictQuery: true });
```

or

```js
// Set `strictQuery` to `true` to omit unknown fields in queries.
const mySchema = new Schema({ name: String }, { strictQuery: true });
```