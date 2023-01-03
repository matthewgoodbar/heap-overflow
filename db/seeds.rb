ApplicationRecord.transaction do 
    puts "Destroying tables..."
    Question.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('questions')
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create demo user:
    User.create!(
      username: 'demo', 
      email: 'demo@heap-overflow.com', 
      password: 'password'
    )
  
    # More users
    10.times do 
      User.create!({
        username: Faker::Internet.unique.username(specifier: 3),
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end

    puts "Creating questions..."
    40.times do
      Question.create!({
        author_id: User.order(Arel.sql('RANDOM()')).first.id,
        title: Faker::Lorem.question(word_count: 5),
        body: Faker::Lorem.paragraph(sentence_count: 14, random_sentences_to_add: 10)
      })
    end
  
    puts "Done!"
  end