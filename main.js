const maxSelections = 5;
let selectedImages = [];
let groupedSequences = [];

//--------------------------------------------------SPARKLE PAGE EFFECT----------------------------------------------------------------------------------------------SPARKLE PAGE EFFECT
document.addEventListener('DOMContentLoaded', () => {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.classList.add('sparkle-container');
    document.body.appendChild(sparkleContainer);

    // Create multiple sparkles
    for (let i = 0; i < 100; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Randomize position and animation delay
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 5}s`;

        sparkleContainer.appendChild(sparkle);
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const sequencesMap = new Map();
    
    // Map sentences to their images for quick lookup
    sequences.forEach(sequence => {
        sequencesMap.set(sequence.sentence, sequence.images);
    });

    // Select all images and add click listeners
    const images = document.querySelectorAll('.sequence-item img');

    images.forEach(image => {
        image.addEventListener('click', () => {
            const sequenceName = image.dataset.sequence; // Get the sequence name
            const relatedImages = sequencesMap.get(sequenceName); // Get all images in the sequence

            if (relatedImages) {
                const displayContainer = document.querySelector('.sequence-images-container');
                displayContainer.innerHTML = ''; // Clear previous content

                // Add all related images to the container
                relatedImages.forEach(imgSrc => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imgSrc;
                    imgElement.alt = `Image from ${sequenceName}`;
                    imgElement.style.margin = '10px'; // Optional: Styling for spacing
                    imgElement.style.maxWidth = '100px'; // Optional: Limit image size
                    displayContainer.appendChild(imgElement);
                });

                // Scroll to the top (optional)
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
});
// ------------------------------- Handle image click to show potential sequences------------------------------------------------------------------------
document.querySelectorAll('.image-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        const clickedImageName = wrapper.querySelector('.image-title').textContent;
        const matchingSequences = getSequencesForImage(clickedImageName);
        displayMatchingSequences(matchingSequences);
    });
});

// -------------------------------Function to get sequences that contain the selected image------------------------------------------------------------------------
function getSequencesForImage(image) {
    return sequences.filter(seq => seq.images.includes(image));
}

// --------------------------------Function to display matching sequences------------------------------------------------------------------------
function displayMatchingSequences(matchingSequences) {
    const sequenceContainer = document.getElementById('sequences');
    sequenceContainer.innerHTML = ''; // Clear previous sequences

    if (matchingSequences.length > 0) {
        matchingSequences.forEach(seq => {
            const div = document.createElement('div');
            div.textContent = seq.sentence;
            div.classList.add('sequence-item'); // Add a class for styling
            div.addEventListener('click', () => {
                showImagesForSequence(seq.images); // Display corresponding images
            });
            sequenceContainer.appendChild(div);
        });
    } else {
        const div = document.createElement('div');
        div.textContent = "No sequences found for this image.";
        sequenceContainer.appendChild(div);
    }
}

// -------------------------------------Function to display images for the selected sequence------------------------------------------------------------------------
function showImagesForSequence(imageTitles) {
    const imageContainer = document.querySelector('.image-container');
    imageContainer.innerHTML = ''; // Clear current images

    imageTitles.forEach(title => {
        const matchingWrapper = Array.from(document.querySelectorAll('.image-wrapper'))
            .find(wrapper => wrapper.querySelector('.image-title').textContent.trim() === title.trim());

        if (matchingWrapper) {
            imageContainer.appendChild(matchingWrapper.cloneNode(true)); // Add the image to the container
        }
    });

    
}

//--------------------------------------------RESET BUTTON LOGIC------------------------------------------------------------------------
document.getElementById('resetButton').addEventListener('click', () => {
    selectedImages = [];
    groupedSequences = [];
    document.querySelectorAll('.image-wrapper').forEach(wrapper => {
        wrapper.classList.remove('selected');
        wrapper.querySelector('.number-badge').style.visibility = 'hidden';
    });
    const sequenceContainer = document.getElementById('sequences');
    sequenceContainer.innerHTML = ''; // Clear sequences
    document.getElementById('searchInput').value = ''; // Clear search bar
    filterImages(); // Reset image display after search bar reset
});
document.getElementById('resetButton').addEventListener('click', () => {
    // Reload the page to reset it to its initial state
    location.reload();
});

//-------------------------------------------------------Group images into sequences------------------------------------------------------------------------
function groupImages() {
    if (selectedImages.length >= 2) {
        groupedSequences.push([...selectedImages]);
        selectedImages = [];
        updateNumbering();
        updateGroupedSequences();
    }
}

// Update grouped sequences display
function updateGroupedSequences() {
    const sequenceContainer = document.getElementById('sequences');
    sequenceContainer.innerHTML = '';
    groupedSequences.forEach((sequence, idx) => {
        const div = document.createElement('div');
        div.textContent = `Sequence ${idx + 1}: ${sequence.join(', ')}`;
        sequenceContainer.appendChild(div);
    });
}


const sequences = [
    {
        sentence: "Abandon - Fear",
        images: ["Abandon", "Fear"]
    },
    {
        sentence: "Adapt - Technology",
        images: ["Adapt", "Technology"]
    },
    {
        sentence: "All - Chaos",
        images: ["All", "Chaos"]
    },
    {
        sentence: "Attack/War - Chaos",
        images: ["Attack/War", "Chaos"]
    },
    {
        sentence: "Attack/War - Difficult",
        images: ["Attack/War", "Difficult"]
    },
    {
        sentence: "Capture - Portal",
        images: ["Capture", "Portal"]
    },
    {
        sentence: "Change - Perspective",
        images: ["Change", "Perspective"]
    },
    {
        sentence: "Civilization - Chaos",
        images: ["Civilization", "Chaos"]
    },
    {
        sentence: "Clear - Consequence",
        images: ["Clear", "Consequence"]
    },
    {
        sentence: "Clear All - Link",
        images: ["Clear All", "Link"]
    },
    {
        sentence: "Create - Danger",
        images: ["Create", "Danger"]
    },
    {
        sentence: "Destroy - Live/Again/Reincarate",
        images: ["Destroy", "Live/Again/Reincarate"]
    },
    {
        sentence: "Discover - Key",
        images: ["Discover", "Key"]
    },
    {
        sentence: "Discover - Lie",
        images: ["Discover", "Lie"]
    },
    {
        sentence: "Discover - Saftey",
        images: ["Discover", "Saftey"]
    },
    {
        sentence: "Field - All",
        images: ["Field", "All"]
    },
    {
        sentence: "Future - Destination",
        images: ["Future", "Destination"]
    },
    {
        sentence: "Help - Them",
        images: ["Help", "Them"]
    },
    {
        sentence: "Interrupt - Evolution/Progress/Success",
        images: ["Interrupt", "Evolution/Progress/Success"]
    },
    {
        sentence: "Key - Link",
        images: ["Key", "Link"]
    },
    {
        sentence: "Lead - Enlightened/Enlightenment",
        images: ["Lead", "Enlightened/Enlightenment"]
    },
    {
        sentence: "Liberate - XM",
        images: ["Liberate", "XM"]
    
    },
    {
        sentence: "Link - Field",
        images: ["Link", "Field"]
    },
    {
        sentence: "Nourish - Journey",
        images: ["Nourish", "Journey"]
    },
    {
        sentence: "Open All - Truth",
        images: ["Open All", "Truth"]
    },
    {
        sentence: "Path - Balance/Perfection",
        images: ["Path", "Balance/Perfection"]
    },
    {
        sentence: "Portal - Presence",
        images: ["Portal", "Presence"]
    },
    {
        sentence: "Pure - Being/Human",
        images: ["Pure", "Being/Human"]
    },

    {
        sentence: "Question - Attack/War",
        images: ["Question", "Attack/War"]
    },
    {
        sentence: "Search - Past",
        images: ["Search", "Past"]
    },
    {
        sentence: "Separate - Potential",
        images: ["Separate", "Potential"]
    },
    {
        sentence: "Separate - Attack/War",
        images: ["Separate", "Attack/War"]
    },
    {
        sentence: "Sheild - Mind",
        images: ["Sheild", "Mind"]
    },
    {
        sentence: "Shield - Portal",
        images: ["Shield", "Portal"]
    },
    {
        sentence: "Star - Nature",
        images: ["Star", "Nature"]
    },
    {
        sentence: "You/Your - Adapt",
        images: ["You/Your", "Adapt"]
    },
{
    sentence: "Abandon - Fear - Together",
    images: ["Anandon", "Fear", "Together"]
},
{
    sentence: "Accept/Open - Being/Human - Weak",
    images: ["Accept/Open", "Being/Human", "Weak"]
},
{
    sentence: "Advance - Pure - Truth",
    images: ["Advance", "Pure", "Truth"]
},
{
    sentence: "All - Civilization - Chaos",
    images: ["All", "Civilization", "Chaos"]
},
{
    sentence: "Answer - N'zeer - Question",
    images: ["Answer", "N'zeer", "Question"]
},
{
    sentence: "Attack/War - Capture - Link",
    images: ["Attack/War", "Capture", "Link"]
},
{
    sentence: "Attack/War - Collective/Shapers - Chaos",
    images: ["Attack/War", "Collective/Shapers", "Chaos"]
},
{
    sentence: "Avoid - Chaos- Soul",
    images: ["Avoid", "Chaos", "Soul"]
},
{
    sentence: "Avoid - Destiny- Lie",
    images: ["Avoid", "Destiny", "Lie"]
},

{
    sentence: "Avoid - Pure - Chaos",
    images: ["Avoid", "Pure", "Chaos"]
},
{
    sentence: "Begin - New - Resistance/Struggle",
    images: ["Begin", "New", "Struggle"]
},
{
    sentence: "Capture - Victory - Together",
    images: ["Capture", "Victory", "Together"]
},
{
    sentence: "Change - Perspective - Technology",
    images: ["Change", "Perspective", "Technology"]
},
{
    sentence: "Clear - You/Your - Mind",
    images: ["Clear", "You/Your", "Mind"]
},
{
    sentence: "Conflict - Grow - Attack/War",
    images: ["Conflict", "Grow", "Attack/War"]
},
{
    sentence: "Courage - Destiny- Rebel",
    images: ["Courage", "Destiny", "Rebel"]
},
{
    sentence: "Create - Truth- Legacy",
    images: ["Create", "Truth", "Legacy"]
},
{
    sentence: "Danger - Change - Past",
    images: ["Danger", "Change", "Past"]
},
{
    sentence: "Defend - Being/Human - Lie",
    images: ["Defend", "Being/Human", "Lie"]
},
{
    sentence: "Destroy - Difficult- Barrier",
    images: ["Destroy", "Difficult", "Barrier"]
},
{
    sentence: "Destroy - Impure - Truth",
    images: ["Destroy", "Impure", "Truth"]
},
{
    sentence: "Destroy - Portal- Shield ",
    images: ["Destroy", "Portal", "Shield"]
},
{
    sentence: "Discover - Resistance/Struggle - Truth",
    images: ["Discover", "Resistance/Struggle", "Truth"]
},
{
    sentence: "Destroy - Collective/Shapers - Enlightened/Enlightenment ",
    images: ["Destroy", "Collective/Shapers", "Enlightened/Enlightenment"]
},
{
    sentence: "Discover - Collective/Shapers - Lie ",
    images: ["Discover", "Collective/Shapers", "Lie"]
},
{
    sentence: "Discover - Collective/Shapers- Message ",
    images: ["Discover", "Collective/Shapers", "Message"]
},
{
    sentence: "Escape - Impure - Evolution/Progress/Success ",
    images: ["Escape", "Impure", "Evolution/Progress/Success"]
},
{
    sentence: "Escape - Impure- Future ",
    images: ["Escape", "Impure", "Future"]
},
{
    sentence: "Fear - Imperfect - Technology ",
    images: ["Fear", "Imperfect", "Technology"]
},
{
    sentence: "Field - All - Mind ",
    images: ["Field", "All", "Mind"]
},
{
    sentence: "Field - Imperfect - Technology ",
    images: ["Field", "Imperfect", "Technology"]
},
{
    sentence: "Field - Nourish - Civilization ",
    images: ["Field", "Nourish", "Civilizaiton"]
},
{
    sentence: "Follow - Pure - Journey ",
    images: ["Follow", "Pure", "Journey"]
},
{
    sentence: "Gain - More - Knowledge ",
    images: ["Gain", "More", "Knowledge"]
},
{
    sentence: "Grow - Collective/Shapers - Presence ",
    images: ["Grow", "Collective/Shapers", "Presence"]
},
{
    sentence: "Harm - Danger - Avoid ",
    images: ["Harm", "Danger", "Avoid"]
},
{
    sentence: "Help - Us/We - All ",
    images: ["Help", "Us/We", "All"]
},
{
    sentence: "Being/Human - Gain - Safety ",
    images: ["Being/Human", "Gain", "Safety"]
},
{
    sentence: "Being/Human - Knowledge - Legacy ",
    images: ["Being/Human", "Knowledge", "Legacy"]
},
{
    sentence: "Improve - Advance - Now/Present ",
    images: ["Improve", "Advance", "Now/Present"]
},
{
    sentence: "Improve - Being/Human - Collective/Shapers ",
    images: ["Improve", "Being/Human", "Collective/Shapers"]
},
{
    sentence: "Inside/Not - XM - Truth ",
    images: ["Inside/Not", "XM", "Truth"]
},
{
    sentence: "Interrupt - Enlightened/Enlightenment - Technology ",
    images: ["Interrupt", "Enlightened/Enlightenment", "Technology"]
},
{
    sentence: "Journey - Inside/Not - Soul ",
    images: ["Journey", "Inside/Not", "Soul"]
},
{
    sentence: "Journey - Link - Portal ",
    images: ["Journey", "Link", "Portal"]
},
{
    sentence: "Key - Potential - Link ",
    images: ["Key", "Potential", "Link"]
},
{
    sentence: "Lead - Enlightened/Enlightenment - Civilization ",
    images: ["Lead", "Enlightened/Enlightenment", "Civilization"]
},
{
    sentence: "Liberate - Being/Human - Future ",
    images: ["Liberate", "EquBeing/Human", "Future"]
},
{
    sentence: "Lie - Equal - Future ",
    images: ["Lie", "Equal", "Future"]
},
{
    sentence: "N'zeer - Technology - Balance/Perfection ",
    images: ["N'zeer", "Technology", "Balance/Perfection"]
},
{
    sentence: "Peace - Simple - Journey ",
    images: ["Peace", "Simple", "Journey"]
},
{
    sentence: "Peace - Worth - More ",
    images: ["Peace", "Worth", "More"]
},
{
    sentence: "Balance/Perfection - Path - Harmony/Peace  ",
    images: ["Balance/Perfection", "Path", "Harmony"]
},
{
    sentence: "Pursue - Pure - Body ",
    images: ["Pursue", "Pure", "Body"]
},
{
    sentence: "Question - Hide - Truth ",
    images: ["Question", "Hide", "Truth"]
},
{
    sentence: "Question - Potential - Mystery ",
    images: ["Question", "Potential", "Mystery"]
},
{
    sentence: "React - Impure - Civilization ",
    images: ["React", "Impure", "Civilization"]
},
{
    sentence: "Recharge/Repair - Portal - Shield ",
    images: ["Recharge/Repair", "Portal", "Shield"]
},
{
    sentence: "Retreat - Search - Safety ",
    images: ["Retreat", "Search", "Safety"]
},
{
    sentence: "Share - Enlightened/Enlightenment - Knowledge ",
    images: ["Share", "Enlightened/Enlightenment", "Knowledge"]
},
{
    sentence: "Share - Resistance/Struggle - Message ",
    images: ["Share", "Resistance/Struggle", "Message"]
},
{
    sentence: "Star - Courage - Difficult ",
    images: ["Star", "Courage", "Difficult"]
},
{
    sentence: "Technology - Capture - Victory ",
    images: ["Technology", "Capture", "Victory"]
},
{
    sentence: "Together - End - Mystery ",
    images: ["Together", "End", "Mystery"]
},
{
    sentence: "Attack/War - Destroy - Future ",
    images: ["Attack/War", "Destroy", "Future"]
},
{
    sentence: "XM - Grow - Creativity/Idea/Thought ",
    images: ["XM", "Grow", "Creativity/Idea/Thought"]
},
{
    sentence: "XM - Nourish - Civilization ",
    images: ["XM", "Nourish", "Civilization"]
},
{
    sentence: "You/Your - Hide - Chaos ",
    images: ["You/Your", "Hide", "Chaos"]
},

//Level 7 Portals
{
    sentence: "Abandon - Fear - Defend - Future ",
    images: ["Abandon", "Fear", "Defend", "Future"]
},
{ 
    sentence: "Abandon - Fear - See - Future",
    images: ["Abandon","Fear","See","Future"]
},
{ 
    sentence: "Adapt - Creativity/Idea/Thought - Discover - Evolution/Progress/Success ",
    images: ["Adapt","Creativity/Idea/Thought","Discover","Evolution/Progress/Success"]
},
{ 
    sentence: "All - Chaos - Insinde/Not - Body ",
    images: ["All","Chaos","Inside/Not","Body"]
},
{ 
    sentence: "Attack/War - Weak - Collective/Shapers - Lie ",
    images: ["Attack/War","Weak","Collective/Shapers","Lie"]
},
{ 
    sentence: "Before - Mystery - After - Knowledge",
    images: ["Before","Mystery","After","Knowledge"]
},
{ 
    sentence: "Begin - Being/Human - Legacy - Now/Present ",
    images: ["Begin","Being/Human","Legacy","Now/Present"]
},
{ 
    sentence: "Begin - Journey - Breathe/Live - XM ",
    images: ["Begin","Journey","Breathe/Live","XM"]
},
{ 
    sentence: "Breathe/Live - Nature - Balance/Perfection - Peace/Harmony ",
    images: ["Breathe/Live","Nature","Balance/Perfection","Peace/Harmony"]
},
{ 
    sentence: "Capture - Fear - Discover - Courage",
    images: ["Capture","Fear","Discover","Courage"]
},
{ 
    sentence: "Change - Future - Capture - Destiny",
    images: ["Change","Future","Capture","Destiny"]  
},
{ 
    sentence: "Change - Being/Human - Potential - Use",
    images: ["Change","Being/Human","Portal","Use"]
},
{ 
    sentence: "Change - Perspective - Begin - New",
    images: ["Change","Perspective","Begin","New"]
},
{ 
    sentence: "Chaos - Barrier - Collective/Shapers - Portal",
    images: ["Chaos","Barrier","Collective/Shapers","Portal"]
},
{ 
    sentence: "Clear - Mind - Accept/Open - Mind",
    images: ["Clear","Mind","Accept/Open","Mind"]
},
{ 
    sentence: "Clear All - Open All - Discover - Truth",
    images: ["Clear All","Open All","Discover","Truth"]
},
{ 
    sentence: "Contemplate - Chaos - Before - Link",
    images: ["Contemplate","Chaos","Before","Link"]
},
{ 
    sentence: "Complex - Collective/Shapers - Cilvilization - Strong",
    images: ["Complex","Collective/Shapers","Cilvilization","Strong"]
},
{ 
    sentence: "Contemplate - Individual/Self - Path - Truth",
    images: ["Contemplate","Individual/Self","Path","Truth"]
},
{ 
    sentence: "Contemplate - Complex - Collective/Shapers - Civilization",
    images: ["Contemplate","Complex","Collective/Shaper","Civilization"]
},
{ 
    sentence: "Courage - Attack/War - Collective/Shapers - Future",
    images: ["Courage","Attack/War","Collective/Shapers","Future"]
},
{ 
    sentence: "Create - Distance - Impure - Path",
    images: ["Create","Distance","Impure","Path"]
},
{ 
    sentence: "Create - Future - Not - War",
    images: ["Create","Future","Not","War"]
},
{ 
    sentence: "Create - New - Portal - Potential",
    images: ["Create","New","Portal","Potential"]
},
{ 
    sentence: "Defend - Field - Gain - Victory",
    images: ["Defend","Field","Gain","Victory"]
},
{ 
    sentence: "Defend - Being/Human - N'zeer - Lie",
    images: ["Defend","Being/Human","N'zeer","Lie"]
},
{ 
    sentence: "Defend - Message - Answer - Creativity/Idea/Thought",
    images: ["Defend","Message","Answer","Creativity/Idea/Thought"]
},
{ 
    sentence: "Destroy - Destiny - Being/Human - Lie",
    images: ["Destroy","Destiny","Being/Human","Lie"]
},
{ 
    sentence: "Destroy - Field - Capture - Key",
    images: ["Destroy","Field","Capture","Key"]
},
{ 
    sentence: "Deteriorate - Being/Human - Weak - Rebel",
    images: ["Deteriorate","Being/Human","Weak","Rebel"]
},
{ 
    sentence: "Difficult - Knowledge - Advance - Mind",
    images: ["Difficult","Knowledge","Advance","Mind"]
},
{ 
    sentence: "Enlightened/Enlightenment - Capture - Victory - Together",
    images: ["Enlightened/Enlightenment","Capture","Victory","Together"]
},
{ 
    sentence: "Escape - Before - Pure - Death/Die",
    images: ["Escape","Before","Pure","Death/Die"]
},
{ 
    sentence: "Escape - Simple - Being/Human - Future",
    images: ["Escape","Simple","Being/Human","Future"]
},
{ 
    sentence: "Fear - Imperfect - N'zeer - Technology",
    images: ["Fear","Imperfect","N'zeer","Technology"]
},
{ 
    sentence: "Follow - Collective/Shapers - Portal - Message",
    images: ["Follow","Collective/Shapers","Portal","Message"]
},
{ 
    sentence: "Forget - Conflict - Accept/Open - Attack/War ",
    images: ["Forget","Conflict","Accept/Open","Attack/War"]
},
{ 
    sentence: "Peace/Harmony - Path - Nourish - Now/Present",
    images: ["Peace/Harmony","Path","Nourish","Now/Present"]
},
{ 
    sentence: "Help - Enlightened/Enlightenment - Strong - Victory ",
    images: ["Help","Enlightened/Enlightenment","Strong","Victory"]
},
{ 
    sentence: "Help - Gain - Create - Pursue",
    images: ["Help","Gain","Create","Pursue"]
},
{ 
    sentence: "Help - Resistance/Struggle - Strong  - Victory",
    images: ["Help","Resistance/Struggle","Strong","Victory"]
},
{ 
    sentence: "Help - Us/We - Save  - Us/We",
    images: ["Help","Us/We","Save","Us/We"]
},
{ 
    sentence: "Hide - Chaos - Inside/Not - Body",
    images: ["Hide","Chaos","Inside/Not","Body"]
},
{ 
    sentence: "Hide - Impure - Being/Human - Creativity/Idea/Thought",
    images: ["Hide","Impure","Being/Human","Creativity/Idea/Thought"]
},
{ 
    sentence: "Being/Human - Have - Impure - Civilization",
    images: ["Being/Human","Have","Impure","Civilization"]
},
{ 
    sentence: "Being/Human - Past - Now/Present - Future",
    images: ["Being/Human","Past","Now/Present","Future"]
},
{ 
    sentence: "Being/Human - Soul - Strong - Pure",
    images: ["Being/Human","Soul","Strong","Pure"]
},
{ 
    sentence: "Ignore - Being/Human - Chaos - Lie",
    images: ["Ignore","Being/Human","Chaos","Lie"]
},
{ 
    sentence: "Improve - Body - Mind - Soul",
    images: ["Improve","Body","Mind","Soul"]
},
{ 
    sentence: "Improve - Body - Pursue - Journey",
    images: ["Improve","Body","Pursue","Journey"]
},
{ 
    sentence: "Inside/Not - Mind - Journey - Balance/Perfection",
    images: ["Inside/Not","Mind","Journey","Balance/Perfection"]
},
{ 
    sentence: "Interrupt - Message - Gain - Advance",
    images: ["Interrupt","Message","Gain","Advance"]
},
{ 
    sentence: "Journey - Inside/Not - Improve - Soul",
    images: ["Journey","Inside/Not","Improve","Soul"]
},
{ 
    sentence: "Knowledge - Help - Gain - Victory",
    images: ["Knowledge","Help","Gain","Victory"]
},
{ 
    sentence: "Lead - Pursue - React - Defend",
    images: ["Lead","Pursue","React","Defend"]
},
{ 
    sentence: "Less - Shield - More - Harm",
    images: ["Less","Shield","More","Harm"]
},
{ 
    sentence: "Less - Soul - More - Mind",
    images: ["Less","Soul","More","Mind"]
},
{ 
    sentence: "Less - Truth - More - Chaos",
    images: ["Less","Truth","More","Chaos"]
},
{ 
    sentence: "Liberate - XM - Portal - Together",
    images: ["Liberate","XM","Portal","Together"]
},
{ 
    sentence: "Link - Key - Field - Success",
    images: ["Link","Key","Field","Success"]
},
{ 
    sentence: " Live/Again/Reincarnate - Death/Die - Again - Evolution/Progress/Success",
    images: ["Live/Again/Reincarnate","Death/Die","Again","Evolution/Progress/Success"]
},
{ 
    sentence: "Lose - Danger - Gain - Safety",
    images: ["Lose","Danger","Gain","Safety"]
},
{ 
    sentence: "Nourish - XM - Create - Creativity/Idea/Thought",
    images: ["Nourish","xm","Create","Creativity/Idea/Thought"]
},
{ 
    sentence: "N'ZEER - Legacy - Create - Future",
    images: ["N'zeer","Legacy","Create","Future"]
},
{ 
    sentence: "N'ZEER - Collective/Shapers - Resistance/Struggle - Knowledge",
    images: ["N'zeer","Collective/Shapers","Resistance/Struggle","Knowledge"]
},
{ 
    sentence: "N'ZEER - Technology - Mind - Evolution/Progress/Success",
    images: ["N'Zeer","Technology","Mind","Evolution/Progress/Success"]
},
{ 
    sentence: "N'ZEER - Technology - Balance/Perfection - Truth",
    images: ["N'ZEER","Technology","Balance/Perfection","Truth"]
},
{ 
    sentence: "Open All - Link - Create - Star",
    images: ["Open All","Link","Create","Star"]
},
{ 
    sentence: "Past - Again - Now/Present - Again",
    images: ["Past","Again","Now/Present","Again"]
},
{ 
    sentence: "Path - Restraint - Strong - Safety",
    images: ["Path","Restraint","Strong","Safety"]
},
{ 
    sentence: "Portal - Change - Civilization - Death/Die",
    images: ["Portal","Change","Civilization","Death/Die"]
},
{ 
    sentence: "Portal - Death/Die - Civilization - End",
    images: ["Portal","Death/Die","Civilization","End"]
},
{ 
    sentence: "Portal - Have - Truth - Data",
    images: ["Portal","Have","Truth","Data"]
},
{ 
    sentence: "Question - Truth - Gain - Future",
    images: ["Question","Truth","Gain","Future"]
},
{ 
    sentence: "Restraint - Fear - Avoid - Danger",
    images: ["Restraint","Fear","Avoid","Danger"]
},
{ 
    sentence: "Restraint - Path - Gain - Peace/Harmony",
    images: ["Restraint","Path","Gain","Peace/Harmony"]
},
{ 
    sentence: "Search - Data - Discover - Path",
    images: ["Search","Data","Discover","Path"]
},
{ 
    sentence: "Search - Truth - Save - Civilization",
    images: ["Search","Truth","Save","Civilization"]
},
{ 
    sentence: "Search - XM - Distance/Outside - Destination",
    images: ["Search","XM","Distance/Outside","Destination"]
},
{ 
    sentence: "See - Truth - See - Future",
    images: ["See","Truth","See","Future"]
},
{ 
    sentence: "Separate - Weak - Ignore - Truth",
    images: ["Separate","Weak","Ignore","Truth"]
},
{ 
    sentence: "Collective/Shapers - Chaos - Pure - Harm",
    images: ["Collective/Shapers","Chaos","Pure","Harm"]
},
{ 
    sentence: "Collective/Shapers - Message - End - Civilization",
    images: ["Collective/Shapers","Message","End","Civilization"]
},
{ 
    sentence: "Collective/Shapers - Mind - Complex - Peace/Harmony ",
    images: ["Collective/Shapers","Mind","Complex","Peace/Harmony"]
},
{ 
    sentence: "Collective/Shapers - Past - Now/Present - Future",
    images: ["Collective/.Shapers","Past","Now/Present","Future"]
},
{ 
    sentence: "Collective/Shapers - See - Potential - Evolution/Progress/Success",
    images: ["Collective/Shapers","See","Potential","Evolution/Progress/Success"]
},
{ 
    sentence: "Share - Key - Save - All",
    images: ["Share","Key","Save","All"]
},
{ 
    sentence: "Shield - Defend - Being/Human - Civilization",
    images: ["Shield","Defend","Being/Human","Civilization"]
},
{ 
    sentence: "Simple - Civilization - Impure - Weak",
    images: ["Simple","Civilization","Impure","Weak"]
},
{ 
    sentence: "Simple - Message - Complex - Creativity/Idea/Thought",
    images: ["Simple","Message","Complex","Creativity/Idea/Thought"]
},
{ 
    sentence: "Simple - Truth - Breathe - Nature",
    images: ["Simple","Truth","Breathe","Nature"]
},
{ 
    sentence: "Soul - Rebel - Being/Human - Death/Die",
    images: ["Soul","Rebel","Being/Human","Death/Die"]
},
{ 
    sentence: "Stay - Together - Defend - Truth",
    images: ["Stay","Together","Defend","Truth"]
},
{ 
    sentence: "Strong - Creativity/Idea/Thought - Pursue - Truth",
    images: ["Strong","Creativity/Idea/Thought","Pursue","Truth"]
},
{ 
    sentence: "Strong - Portal - Strong - Field",
    images: ["Strong","Portal","Strong","Field"]
},
{ 
    sentence: "Strong - Together - Avoid - Attack/War",
    images: ["Strong","Together","Avoid","Attack/War"]
},
{ 
    sentence: "Resistance/Struggle - Defend - Collective/Shapers - Danger",
    images: ["Resistance/Struggle","Defend","Collective/Shapers","Danger"]
},
{ 
    sentence: "Resistance/Struggle - Improve - Being/Human - Soul",
    images: ["Resistance/Struggle","Improve","Being/Human","Soul"]
},
{ 
    sentence: "Together - Discover - Peace/Harmony - Equal",
    images: ["Together","Discover","Peace/Hamrony","Equal"]
},
{ 
    sentence: "Truth - Creativity/Idea/Thought - Discover - XM",
    images: ["Truth","Creativity/Idea/Thought","Discover","XM"]
},
{ 
    sentence: "Attack/War - Not - Worth - Consequence",
    images: ["Attack/War","Not","Worth","Consequence"]
},
{ 
    sentence: "Weak - Portal - Weak - Field",
    images: ["Weak","Portal","Weak","Field"]
},
{ 
    sentence: "XM - Death/Die - Chaos - Live",
    images: ["XM","Death/Die","Chaos","Live"]
},
{ 
    sentence: "XM - Nourish - Strong - Creativity/Idea/Thought",
    images: ["XM","Nourish","Strong","Creativity/Idea/Thought"]
},
{ 
    sentence: "XM - Share - You/Your - Creativity/Idea/Thought",
    images: ["XM","Share","You/Your","Creativity/Idea/Thought"]
},
//Level 8 Portals
{ 
    sentence: "- - - -",
    images: ["","","","",""]
},
];







// ------------------------------------Function to filter images based on search term------------------------------------------------------------------------
document.getElementById('searchInput').addEventListener('input', filterImages);

// Function to filter images
function filterImages() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const allImageWrappers = document.querySelectorAll('.image-wrapper');

    allImageWrappers.forEach(wrapper => {
        const imageTitle = wrapper.querySelector('.image-title').textContent.toLowerCase();
        if (imageTitle.includes(searchTerm)) {
            wrapper.style.display = ''; // Show image if title matches search
        } else {
            wrapper.style.display = 'none'; // Hide image if title does not match search
        }
    });
}

let selectedFilter = null;

//------------------------------------Handle sidebar filter clicks------------------------------------------------------------------------
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        selectedFilter = parseInt(button.getAttribute('data-length'), 10); // Get the selected filter value
        const clickedImage = document.querySelector('.image-wrapper.selected'); // Get selected image (if any)

        if (clickedImage) {
            const clickedImageName = clickedImage.querySelector('.image-title').textContent;
            const matchingSequences = getSequencesForImage(clickedImageName);
            const filteredSequences = filterSequencesByLength(matchingSequences, selectedFilter);
            displayMatchingSequences(filteredSequences);
        } else {
            const filteredSequences = filterSequencesByLength(sequences, selectedFilter);
            displayMatchingSequences(filteredSequences);
        }
    });
});

//------------------------------------Filter sequences by length------------------------------------------------------------------------
function filterSequencesByLength(sequences, length) {
    return sequences.filter(seq => seq.images.length === length);
}

// Handle image click to filter sequences
document.querySelectorAll('.image-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        document.querySelectorAll('.image-wrapper').forEach(w => w.classList.remove('selected')); // Deselect all
        wrapper.classList.add('selected'); // Mark current as selected

        const clickedImageName = wrapper.querySelector('.image-title').textContent;
        let matchingSequences = getSequencesForImage(clickedImageName);

        if (selectedFilter) {
            matchingSequences = filterSequencesByLength(matchingSequences, selectedFilter);
        }

        displayMatchingSequences(matchingSequences);
    });
});

function displayMatchingSequences(matchingSequences) {
    const sequenceContainer = document.getElementById('sequences');
    sequenceContainer.innerHTML = ''; // Clear previous sequences

    if (matchingSequences.length > 0) {
        matchingSequences.forEach(seq => {
            // Create a container for the sequence and its images
            const sequenceItem = document.createElement('div');
            sequenceItem.classList.add('sequence-item');

            // Add the sequence sentence
            const sequenceText = document.createElement('div');
            sequenceText.textContent = seq.sentence;
            sequenceText.classList.add('sequence-text');

            // Create a container for the images
            const imagesContainer = document.createElement('div');
            imagesContainer.classList.add('images-container');

            // Add each image associated with the sequence
            seq.images.forEach(imageTitle => {
                const matchingWrapper = Array.from(document.querySelectorAll('.image-wrapper'))
                    .find(wrapper => wrapper.querySelector('.image-title').textContent.trim() === imageTitle.trim());

                if (matchingWrapper) {
                    const imageClone = matchingWrapper.cloneNode(true); // Clone the original image
                    imagesContainer.appendChild(imageClone); // Add the image to the images container
                }
            });

            // Append the sequence sentence and images to the sequence item
            sequenceItem.appendChild(sequenceText);
            sequenceItem.appendChild(imagesContainer);

            // Add the sequence item to the container
            sequenceContainer.appendChild(sequenceItem);
        });
    } else {
        const noResults = document.createElement('div');
        noResults.textContent = "No sequences found.";
        sequenceContainer.appendChild(noResults);
    }
}
//------------------------------------Function to display matching sequences with a "Show Gif" button------------------------------------------------------------------------
function displayMatchingSequences(matchingSequences) {
    const sequenceContainer = document.getElementById('sequences');
    sequenceContainer.innerHTML = ''; // Clear previous sequences

    if (matchingSequences.length > 0) {
        matchingSequences.forEach(seq => {
            // Create a container for the sequence and its images
            const sequenceItem = document.createElement('div');
            sequenceItem.classList.add('sequence-item');

            // Add the sequence sentence
            const sequenceText = document.createElement('div');
            sequenceText.textContent = seq.sentence;
            sequenceText.classList.add('sequence-text');

            // Create a container for the images
            const imagesContainer = document.createElement('div');
            imagesContainer.classList.add('images-container');

            // Add each image associated with the sequence
            seq.images.forEach(imageTitle => {
                const matchingWrapper = Array.from(document.querySelectorAll('.image-wrapper'))
                    .find(wrapper => wrapper.querySelector('.image-title').textContent.trim() === imageTitle.trim());

                if (matchingWrapper) {
                    const imageClone = matchingWrapper.cloneNode(true); // Clone the original image
                    imagesContainer.appendChild(imageClone); // Add the image to the images container
                }
            });

            //------------------------------------------------------------------------Create the "Show Gif" button
            const gifButton = document.createElement('button');
            gifButton.textContent = 'Show Gif';
            gifButton.classList.add('show-gif-button');
            
            // Event listener to show the GIF when clicked
            gifButton.addEventListener('click', () => {
                const gifContainer = document.createElement('div');
                gifContainer.classList.add('gif-container');
                const gifUrl = "https://gm9.github.io/ingress-glyph-tools/example-glyph-sequences.html"; // GIF URL or iframe
                const iframe = document.createElement('iframe');
                iframe.src = gifUrl;
                iframe.width = "100%";
                iframe.height = "400px";
                gifContainer.appendChild(iframe);

                // Append GIF container below the sequence
                sequenceItem.appendChild(gifContainer);
            });

            // Append the sequence sentence, images, and button to the sequence item
            sequenceItem.appendChild(sequenceText);
            sequenceItem.appendChild(imagesContainer);
            sequenceItem.appendChild(gifButton);

            // Add the sequence item to the container
            sequenceContainer.appendChild(sequenceItem);
        });
    } else {
        const noResults = document.createElement('div');
        noResults.textContent = "No sequences found.";
        sequenceContainer.appendChild(noResults);
    }
}
//------------------------------------------------------------------------ BACK TO TOP OF PAGE
document.addEventListener('DOMContentLoaded', () => {
    // Select all images within the page
    const images = document.querySelectorAll('img'); // Adjust selector to target the specific images you want

    images.forEach(image => {
        image.addEventListener('click', () => {
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scrolling effect
            });
        });
    });
});

//---------------------------------------------------------SIDE BAR DISSAPEARANCE------------------------------------------------------------------------ 
document.addEventListener('DOMContentLoaded', () => {
    const filterContainer = document.querySelector('.sidebar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const currentScrollTop = window.scrollY;

        if (currentScrollTop > lastScrollTop) {
    
            // User is scrolling down
            filterContainer.style.opacity = '0';
            filterContainer.style.pointerEvents = 'none'; // Disable interaction when hidden
        } else {
            // User is scrolling up
            filterContainer.style.opacity = '1';
            filterContainer.style.pointerEvents = 'auto'; // Enable interaction when visible
        }

        lastScrollTop = currentScrollTop;
    });
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

