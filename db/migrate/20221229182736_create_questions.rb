class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.references :author, null: false, foreign_key: {to_table: :users}
      t.string :title, null: false, index: {unique: true}
      t.text :body, null: false

      t.timestamps
    end
  end
end
