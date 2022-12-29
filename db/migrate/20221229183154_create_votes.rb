class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.references :voter, null: false, foreign_key: {to_table: :users}
      t.references :answer, null: false, foreign_key: true
      t.string :vote_type, null: false
      t.index [:voter_id, :answer_id], unique: true

      t.timestamps
    end
  end
end
