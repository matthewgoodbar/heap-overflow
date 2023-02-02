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
      fake_title = [
        "Do #{Faker::Hacker.adjective} #{(Faker::Hacker.noun).pluralize} #{Faker::Hacker.verb} #{Faker::Hacker.adjective} #{(Faker::Hacker.noun).pluralize}?",
        "How can I #{Faker::Hacker.verb} my #{Faker::Hacker.adjective} #{Faker::Hacker.noun}?",
        "Does anyone know whether or not #{Faker::Hacker.abbreviation} #{(Faker::Hacker.noun).pluralize} #{Faker::Hacker.verb} #{(Faker::Hacker.noun).pluralize}?",
        "My #{Faker::Hacker.abbreviation} #{Faker::Hacker.noun} just died. Am I screwed?",
        "Where can I find #{Faker::Hacker.abbreviation} #{(Faker::Hacker.noun).pluralize} for cheap?"
      ].sample(1).first
      fake_body = [
        "I tried to #{Faker::Hacker.verb} the #{Faker::Hacker.noun} but it didn't work.",
        "I tried looking it up, but it seems like most #{(Faker::Hacker.noun).pluralize} are #{Faker::Hacker.adjective}.",
        "Help!!!!!",
        "Anybody had this issue before?",
        "My #{Faker::Hacker.adjective} #{Faker::Hacker.noun} is also a #{Faker::Hacker.abbreviation} #{Faker::Hacker.noun}",
        "Context: my #{Faker::Hacker.abbreviation} #{Faker::Hacker.noun} recently #{Faker::Hacker.verb} the #{(Faker::Hacker.noun).pluralize}.",
        "I tried doing a #{Faker::Hacker.abbreviation} #{Faker::Hacker.verb} over the #{Faker::Hacker.abbreviation} but to no avail."
      ]
      Question.create!({
        author_id: User.order(Arel.sql('RANDOM()')).first.id,
        title: fake_title,
        body: fake_body.sample(2).join(" ")
      })
    end

    puts "Creating answers..."
    60.times do
      fake_answer_snippets = [
        "Have you tried doing a #{Faker::Hacker.abbreviation} #{Faker::Hacker.verb} on the #{Faker::Hacker.adjective} #{Faker::Hacker.noun}?",
        "Maybe the #{Faker::Hacker.abbreviation} became #{Faker::Hacker.adjective}.",
        "Sounds like a #{Faker::Hacker.abbreviation} problem.",
        "Doing a #{Faker::Hacker.adjective} #{Faker::Hacker.verb} over the #{Faker::Hacker.abbreviation} is never a good idea.",
        "I wouldn't #{Faker::Hacker.verb} #{(Faker::Hacker.noun).pluralize} if I were you.",
        "You might have better luck doing a #{Faker::Hacker.abbreviation} #{Faker::Hacker.verb} on your #{Faker::Hacker.adjective} #{Faker::Hacker.noun}.",
        "Don't sweat it if you can't #{Faker::Hacker.verb} your #{Faker::Hacker.abbreviation} right away.",
        "I've run into this exact issue.",
        "Try making your #{(Faker::Hacker.noun).pluralize} #{Faker::Hacker.adjective}.",
        "#{(Faker::Hacker.ingverb).capitalize} your #{Faker::Hacker.abbreviation} #{(Faker::Hacker.noun).pluralize} might be your best bet."
      ]
      Answer.create!({
        author_id: User.order(Arel.sql('RANDOM()')).first.id,
        question_id: Question.order(Arel.sql('RANDOM()')).first.id,
        body: fake_answer_snippets.sample(3).join(" ")
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