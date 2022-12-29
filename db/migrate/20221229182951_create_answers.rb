class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.references :author, null: false, foreign_key: {to_table: :users}
      t.references :question, null: false, foreign_key: true
      t.text :body, null: false

      t.timestamps
    end
  end
end
