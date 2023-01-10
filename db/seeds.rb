ApplicationRecord.transaction do 
    puts "Destroying tables..."
    Vote.destroy_all
    Answer.destroy_all
    Question.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('votes')
    ApplicationRecord.connection.reset_pk_sequence!('answers')
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

    puts "Creating answers..."
    60.times do
      Answer.create!({
        author_id: User.order(Arel.sql('RANDOM()')).first.id,
        question_id: Question.order(Arel.sql('RANDOM()')).first.id,
        body: Faker::Lorem.paragraph(sentence_count: 10, random_sentences_to_add: 15)
      })
    end

    puts "Creating votes..."
    # 480.times do
    #   Vote.create({
    #     voter_id: User.order(Arel.sql('RANDOM()')).first.id,
    #     answer_id: Answer.order(Arel.sql('RANDOM()')).first.id,
    #     vote_type: ["up", "down"].sample()
    #   })
    # end
    User.where('NOT id=1').each do |user|
      Answer.all.each do |answer|
        Vote.create({
          voter_id: user.id,
          answer_id: answer.id,
          vote_type: ["up","down"].sample()
        })
      end
    end
  
    puts "Done!"
  end